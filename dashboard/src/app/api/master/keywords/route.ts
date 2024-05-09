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
    const parsedWhereClause = {
      ...whereClause,
      faculty_id: sessions.user.faculty[0].id,
    };
    const includeClase = buildPrismaIncludeClause(relatedTables);
    const orderByClause = transformForPrismaOrderBy(sortParams);
    const [response, totalCount] = await Promise.all([
      prisma.keywords.findMany({
        take: limit,
        skip: offset,
        where: parsedWhereClause,
        include: includeClase,
        orderBy: orderByClause,
      }),
      prisma.keywords.count({
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
  if (
    !sessions ||
    (sessions.user.role.name !== 'Deans' &&
      sessions.user.role.name !== 'Supervisor')
  ) {
    return unauthorizedResponse();
  }
  try {
    const { name } = await req.json();
    const response = await prisma.keywords.create({
      data: {
        name,
        faculty: { connect: { id: Number(sessions.user.faculty[0].id) } },
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
    const response = await prisma.keywords.delete({
      where: {
        id: parseInt(id),
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
    const response = await prisma.keywords.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    });
    return successResponse(response);
  } catch (e) {
    return internalServerErrorResponse();
  }
}
