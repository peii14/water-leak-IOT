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
    const includeClase = buildPrismaIncludeClause(relatedTables);
    const orderByClause = transformForPrismaOrderBy(sortParams);
    const [response, totalCount] = await Promise.all([
      prisma.faculties.findMany({
        take: limit,
        skip: offset,
        where: whereClause,
        include: includeClase,
        orderBy: orderByClause,
      }),
      prisma.faculties.count({
        where: whereClause,
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
  if (!sessions || sessions.user.role.name !== 'Admin') {
    return unauthorizedResponse();
  }
  try {
    const { name } = await req.json();
    const response = await prisma.faculties.create({
      data: {
        name,
      },
    });
    return successResponse(response);
  } catch (e) {
    return internalServerErrorResponse();
  }
}
export async function DELETE(req: NextRequest) {
  const sessions = await getServerSessions();
  if (!sessions || sessions.user.role.name !== 'Admin') {
    return unauthorizedResponse();
  }
  try {
    const id = await req.json();
    const response = await prisma.faculties.delete({
      where: {
        id: parseInt(id),
      },
      include: {
        majors: {
          include: {
            groups: true,
          },
        },
      },
    });
    return successResponse(response);
  } catch (e) {
    return internalServerErrorResponse();
  }
}

export async function PUT(req: NextRequest) {
  const sessions = await getServerSessions();
  if (!sessions || sessions.user.role.name !== 'Admin') {
    return unauthorizedResponse();
  }
  try {
    const { id, name } = await req.json();
    const response = await prisma.faculties.update({
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
