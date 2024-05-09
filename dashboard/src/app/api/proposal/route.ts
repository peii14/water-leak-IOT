import { NextRequest } from 'next/server';

import {
  buildPrismaIncludeClause,
  buildPrismaWhereClause,
  internalServerErrorResponse,
  parseQueryParams,
  successResponse,
  transformForPrismaOrderBy,
  unauthorizedResponse,
} from '@/_lib/apiHelpers';
import { prisma } from '@/_lib/prisma';
import { getServerSessions } from '@/_lib/serverSession';

export async function GET(req: NextRequest) {
  const {
    limit,
    offset,
    filterKey,
    filterOperator,
    filterValue,
    sortParams,
    relatedTables,
  } = parseQueryParams(req);
  const keywordsId = req.nextUrl.searchParams.get('keywords_id');
  const sessions = await getServerSessions();
  if (!sessions) {
    return unauthorizedResponse();
  }
  try {
    const whereClause = buildPrismaWhereClause(
      filterKey,
      filterOperator,
      filterValue
    );
    const includeClase = buildPrismaIncludeClause(relatedTables);
    let parsedWhere;
    if (keywordsId) {
      parsedWhere = {
        ...whereClause,
        draft: {
          keywords: {
            some: {
              id: Number(keywordsId),
            },
          },
        },
      };
    } else {
      parsedWhere = whereClause;
    }
    const orderByClause = transformForPrismaOrderBy(sortParams);
    const [response, totalCount] = await Promise.all([
      prisma.proposals.findMany({
        take: limit,
        skip: offset,
        where: parsedWhere,
        include: includeClase,
        orderBy: orderByClause,
      }),
      prisma.proposals.count({
        where: parsedWhere,
      }),
    ]);
    const lastPage = Math.ceil(totalCount / limit);
    return successResponse(response, {
      last_page: lastPage,
      total: totalCount,
    });
  } catch (e) {
    return internalServerErrorResponse();
  }
}
export async function POST(req: NextRequest) {
  const sessions = await getServerSessions();
  if (!sessions || sessions.user.role.name === 'Admin') {
    return unauthorizedResponse();
  }
  try {
    const today = new Date();
    const { title, description, keywords_id, supervisor_id } = await req.json();
    const response = await prisma.proposals.create({
      data: {
        created_at: today,
        group: {
          connect: { id: Number(sessions.user.groups[0].id) },
        },
        student: {
          connect: {
            id: Number(sessions.user.id),
          },
        },
        supervisor: {
          connect: {
            id: Number(supervisor_id),
          },
        },
        draft: {
          create: {
            title,
            description,
            keywords: {
              connect: keywords_id.map((item: { id: number }) => ({
                id: Number(item),
              })),
            },
            status: {
              connect: {
                id: 1,
              },
            },
            created_at: today,
          },
        },
      },
      include: {
        draft: true,
        student: true,
        supervisor: true,
        group: true,
      },
    });
    return successResponse(response);
  } catch (e) {
    return internalServerErrorResponse();
  }
}
export async function PUT(req: NextRequest) {
  const sessions = await getServerSessions();
  if (!sessions || sessions.user.role.name === 'Admin') {
    return unauthorizedResponse();
  }
  try {
    const { id, title, description, keywords_id, supervisor_id } =
      await req.json();
    if (!id) {
      return internalServerErrorResponse();
    }
    const response = await prisma.proposals.update({
      where: {
        id,
      },
      data: {
        group: {
          connect: { id: Number(sessions.user.groups[0].id) },
        },
        student: {
          connect: {
            id: Number(sessions.user.id),
          },
        },
        supervisor: {
          connect: {
            id: Number(supervisor_id),
          },
        },
        draft: {
          update: {
            title,
            description,
            keywords: {
              connect: keywords_id.map((item: { id: number }) => ({
                id: Number(item),
              })),
            },
            status: {
              connect: {
                id: 1,
              },
            },
          },
        },
      },
      include: {
        draft: true,
        student: true,
        supervisor: true,
        group: true,
      },
    });
    return successResponse(response);
  } catch (e) {
    return internalServerErrorResponse();
  }
}

export async function PATCH(req: NextRequest) {
  const sessions = await getServerSessions();
  if (!sessions || sessions.user.role.name !== 'Supervisor') {
    return unauthorizedResponse();
  }
  try {
    const { id, status_id } = await req.json();
    const response = await prisma.proposals.update({
      where: {
        id: parseInt(id),
      },
      data: {
        draft: {
          update: {
            status: {
              connect: {
                id: parseInt(status_id),
              },
            },
          },
        },
      },
      include: {
        draft: true,
      },
    });
    return successResponse(response);
  } catch (e) {
    return internalServerErrorResponse();
  }
}

export async function DELETE(req: NextRequest) {
  const sessions = await getServerSessions();
  if (!sessions || sessions.user.role.name === 'Admin') {
    return unauthorizedResponse();
  }
  try {
    const { id } = await req.json();
    const response = await prisma.proposals.delete({
      where: {
        id: parseInt(id),
      },
      include: {
        draft: true,
      },
    });
    return successResponse(response);
  } catch (e) {
    return internalServerErrorResponse();
  }
}
