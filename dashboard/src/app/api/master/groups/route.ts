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
    let parsedWhereClause;
    if (sessions.user.role.name === 'Student') {
      parsedWhereClause = {
        ...whereClause,
        id: sessions.user.groups[0].id,
        majors: {
          faculty_id: sessions.user.faculty[0].id,
        },
      };
    } else {
      parsedWhereClause = {
        ...whereClause,
        majors: {
          faculty_id: sessions.user.faculty[0].id,
        },
      };
    }
    const includeClase = buildPrismaIncludeClause(relatedTables);

    const orderByClause = transformForPrismaOrderBy(sortParams);
    const [response, totalCount] = await Promise.all([
      prisma.groups.findMany({
        take: limit,
        skip: offset,
        where: parsedWhereClause,
        include: includeClase,
        orderBy: orderByClause,
      }),
      prisma.groups.count({
        where: parsedWhereClause,
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
  if (!sessions || sessions.user.role.name !== 'Deans') {
    return unauthorizedResponse();
  }
  try {
    const { name, major_id } = await req.json();
    const response = await prisma.groups.create({
      data: {
        name,
        major_id: Number(major_id),
      },
    });
    return successResponse(response);
  } catch (e) {
    return internalServerErrorResponse();
  }
}
export async function PUT(req: NextRequest) {
  const sessions = await getServerSessions();
  if (!sessions || sessions.user.role.name !== 'Deans') {
    return unauthorizedResponse();
  }
  try {
    const { id, name } = await req.json();
    const response = await prisma.groups.update({
      where: {
        id,
      },
      data: {
        name,
        faculty_id: Number(sessions.user.faculty[0].id),
      },
    });
    return successResponse(response);
  } catch (e) {
    return internalServerErrorResponse();
  }
}

export async function PATCH(req: NextRequest) {
  const sessions = await getServerSessions();
  if (!sessions || sessions.user.role.name !== 'Deans') {
    return unauthorizedResponse();
  }
  try {
    const { id, supervisor_id } = await req.json();
    const response = await prisma.groups.update({
      where: {
        id: parseInt(id),
      },
      data: {
        supervisors: {
          set: supervisor_id.map((item: { id: number }) => ({
            id: Number(item.id),
          })),
        },
      },
    });
    return successResponse(response);
  } catch (e) {
    return internalServerErrorResponse();
  }
}

export async function DELETE(req: NextRequest) {
  const sessions = await getServerSessions();
  if (!sessions || sessions.user.role.name !== 'Deans') {
    return unauthorizedResponse();
  }
  try {
    const id = await req.json();
    const response = await prisma.groups.delete({
      where: {
        id: parseInt(id),
      },
    });
    return successResponse(response);
  } catch (e) {
    return internalServerErrorResponse();
  }
}
