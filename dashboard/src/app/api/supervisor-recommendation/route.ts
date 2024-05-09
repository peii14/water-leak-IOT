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
  const studentId = req.nextUrl.searchParams.get('students_id');
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
    if (studentId && keywordsId) {
      parsedWhere = {
        ...whereClause,
        students: {
          some: {
            id: Number(studentId),
          },
        },
        draft: {
          keywords: {
            some: {
              id: Number(keywordsId),
            },
          },
        },
      };
    } else if (keywordsId) {
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
    } else if (studentId) {
      parsedWhere = {
        ...whereClause,
        students: {
          some: {
            id: Number(studentId),
          },
        },
      };
    } else {
      parsedWhere = whereClause;
    }
    const orderByClause = transformForPrismaOrderBy(sortParams);
    const [response, totalCount] = await Promise.all([
      prisma.supervisor_recomendations.findMany({
        take: limit,
        skip: offset,
        where: parsedWhere,
        include: includeClase,
        orderBy: orderByClause,
      }),
      prisma.supervisor_recomendations.count({
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
    const { title, description, keywords_id } = await req.json();
    const response = await prisma.supervisor_recomendations.create({
      data: {
        supervisor: {
          connect: {
            id: Number(sessions.user.id),
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
                id: 5,
              },
            },
            created_at: today,
          },
        },
      },
      include: {
        draft: true,
        supervisor: true,
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
    const { id, title, description, keywords_id } = await req.json();
    if (!id) {
      return internalServerErrorResponse();
    }
    const response = await prisma.supervisor_recomendations.update({
      where: {
        id,
      },
      data: {
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
                id: 5,
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

export async function PATCH(req: NextRequest) {
  const sessions = await getServerSessions();
  if (!sessions || sessions.user.role.name !== 'Supervisor') {
    return unauthorizedResponse();
  }
  try {
    const { id, student_id } = await req.json();
    const response = await prisma.supervisor_recomendations.update({
      where: {
        id: parseInt(id),
      },
      data: {
        selected_student: {
          connect: {
            id: parseInt(student_id),
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
    const response = await prisma.supervisor_recomendations.delete({
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
