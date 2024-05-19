import { NextRequest } from "next/server";

import {
  buildPrismaIncludeClause,
  buildPrismaWhereClause,
  internalServerErrorResponse,
  parseQueryParams,
  successResponse,
  transformForPrismaOrderBy,
  unauthorizedResponse,
} from "@/_lib/apiHelpers";
import { prisma } from "@/_lib/prisma";
import { getServerSessions } from "@/_lib/serverSession";

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
      prisma.limits.findMany({
        take: limit,
        skip: offset,
        where: whereClause,
        include: includeClase,
        orderBy: orderByClause,
      }),
      prisma.limits.count({
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
  if (!sessions) {
    return unauthorizedResponse();
  }
  try {
    const { limit } = await req.json();
    const response = await prisma.limits.create({
      data: {
        created_at: new Date(),
        limit: limit,
        updated_at: new Date(),
        user: {
          connect: {
            id: Number(sessions.user.id),
          },
        },
      },
    });
    return successResponse(response);
  } catch (e) {
    console.log(e);
    return internalServerErrorResponse();
  }
}
export async function DELETE(req: NextRequest) {
  const sessions = await getServerSessions();
  if (!sessions) {
    return unauthorizedResponse();
  }
  try {
    const id = await req.json();
    const response = await prisma.limits.delete({
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
  if (!sessions) {
    return unauthorizedResponse();
  }
  try {
    const { id, limit } = await req.json();

    const response = await prisma.limits.update({
      where: {
        id: parseInt(id),
      },
      data: {
        limit: Number(limit),
        user: {
          connect: {
            id: Number(sessions.user.id),
          },
        },
      },
    });
    return successResponse(response);
  } catch (e) {
    return internalServerErrorResponse();
  }
}
