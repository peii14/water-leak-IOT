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

export async function POST(req: NextRequest) {
  const sessions = await getServerSessions();
  if (!sessions || sessions.user.role.name !== 'Admin') {
    return unauthorizedResponse();
  }
  const { name } = await req.json();
  try {
    await prisma.role.create({
      data: { name },
    });
    return successResponse(name);
  } catch (e) {
    internalServerErrorResponse();
  }
}
export async function GET(req: NextRequest) {
  //  const sessions = await getServerSessions();
  //  if (!sessions ) {
  //    return unauthorizedResponse();
  //  }
  const {
    limit,
    offset,
    filterKey,
    filterOperator,
    filterValue,
    sortParams,
    relatedTables,
  } = parseQueryParams(req);
  try {
    const whereClause = buildPrismaWhereClause(
      filterKey,
      filterOperator,
      filterValue
    );
    const includeClase = buildPrismaIncludeClause(relatedTables);

    const orderByClause = transformForPrismaOrderBy(sortParams);
    const [response, totalCount] = await Promise.all([
      prisma.role.findMany({
        take: limit,
        skip: offset,
        where: whereClause,
        include: includeClase,
        orderBy: orderByClause,
      }),
      prisma.role.count({
        where: whereClause,
      }),
    ]);
    const lastPage = Math.ceil(totalCount / limit);
    return successResponse(
      response,
      { last_page: lastPage, total: totalCount },
      'Role fetched successfully'
    );
  } catch (e) {
    return internalServerErrorResponse();
  }
}

export async function PUT(req: NextRequest) {
  const sessions = await getServerSessions();
  if (!sessions || sessions.user.role.name !== 'Admin') {
    return unauthorizedResponse();
  }
  const { id, name } = await req.json();
  try {
    const res = await prisma.role.update({
      where: { id: Number(id) },
      data: { name },
    });
    return successResponse(res);
  } catch (e) {
    return internalServerErrorResponse();
  }
}

export async function DELETE(req: NextRequest) {
  const sessions = await getServerSessions();
  if (!sessions || sessions.user.role.name !== 'Admin') {
    return unauthorizedResponse();
  }
  const id = await req.json();
  try {
    const res = await prisma.role.delete({
      where: { id: Number(id) },
    });
    return successResponse(res);
  } catch (e) {
    return internalServerErrorResponse();
  }
}
