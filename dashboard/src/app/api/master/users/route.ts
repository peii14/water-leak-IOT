import argon2 from 'argon2';
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
  const {
    name,
    email,
    role_id,
    username,
    password,
    faculty_id,
    keywords_id,
    group_id,
    program,
    father_name,
  } = await req.json();
  const [sessions, hashedPassword] = await Promise.all([
    getServerSessions(),
    argon2.hash(password),
  ]);

  if (
    !sessions ||
    sessions.user.role.id < role_id ||
    sessions.user.role.id === 1
  ) {
    return unauthorizedResponse();
  }

  const transformedFacultyIds: number[] = (
    typeof faculty_id === 'string' ? [faculty_id] : faculty_id
  ).map((id: string) => parseInt(id));

  const data: {
    name: string;
    email: string;
    role_id: number;
    username: string;
    password: string;
    created_at: Date;
    program?: string;
    father_name?: string;
    keywords?: { connect: { id: number }[] };
    faculties?: { connect: { id: number }[] };
    groups?: { connect: { id: number }[] };
  } = {
    name,
    email,
    role_id,
    username,
    father_name: father_name && father_name,
    program: program && program,
    password: hashedPassword,
    created_at: new Date(),
  };
  if (group_id) {
    data.groups = {
      connect: group_id.map((id: number) => ({ id: Number(id) })),
    };
  }
  if (keywords_id) {
    data.keywords = {
      connect: keywords_id.map((id: number) => ({ id: Number(id) })),
    };
  }

  if (role_id === 3 && transformedFacultyIds.length) {
    data.faculties = {
      connect: [{ id: transformedFacultyIds[0] }],
    };
  }

  if ([1, 2].includes(role_id) && transformedFacultyIds.length) {
    data.faculties = {
      connect: transformedFacultyIds.map((id) => ({ id })),
    };
  }
  try {
    await prisma.users.create({ data });
    return successResponse(name);
  } catch (e) {
    return internalServerErrorResponse();
  }
}
export async function GET(req: NextRequest) {
  const sessions = await getServerSessions();
  if (!sessions) {
    return unauthorizedResponse();
  }
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
    const inclueClause = buildPrismaIncludeClause(relatedTables);

    const orderByClause = transformForPrismaOrderBy(sortParams);
    const [response, totalCount] = await Promise.all([
      prisma.users.findMany({
        take: limit,
        include: inclueClause,
        skip: offset,
        where: whereClause,
        orderBy: orderByClause,
      }),
      prisma.users.count({
        where: whereClause,
      }),
    ]);
    const lastPage = Math.ceil(totalCount / limit);
    return successResponse(
      response,
      { last_page: lastPage, total: totalCount },
      'User fetched successfully'
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
    const res = await prisma.users.update({
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
  if (!sessions || sessions.user.role.name === 'Student') {
    return unauthorizedResponse();
  }
  const id = await req.json();
  try {
    const res = await prisma.users.delete({
      where: { id: Number(id) },
    });
    return successResponse(res);
  } catch (e) {
    return internalServerErrorResponse();
  }
}
