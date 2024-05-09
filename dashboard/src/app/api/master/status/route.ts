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
  const session = await getServerSessions();
  if (!session) return unauthorizedResponse();
  try {
    const {
      limit,
      offset,
      filterKey,
      filterOperator,
      filterValue,
      sortParams,
      relatedTables,
    } = parseQueryParams(req);
    const whereClause = buildPrismaWhereClause(
      filterKey,
      filterOperator,
      filterValue
    );
    const inclueClause = buildPrismaIncludeClause(relatedTables);

    const orderByClause = transformForPrismaOrderBy(sortParams);
    const [response, totalCount] = await Promise.all([
      prisma.status.findMany({
        take: limit,
        include: inclueClause,
        skip: offset,
        where: whereClause,
        orderBy: orderByClause,
      }),
      prisma.status.count({
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
