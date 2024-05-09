/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from 'next/server';

import { MetaProps } from '@/_types/api/api.type';

export const parseQueryParams = (req: NextRequest) => {
  const limit = parseInt(
    req.nextUrl.searchParams.get('limit') || '10000000000001'
  );
  const page = parseInt(req.nextUrl.searchParams.get('page') || '1');
  const filterKey = req.nextUrl.searchParams.getAll('filter_key');
  const filterOperator = req.nextUrl.searchParams.getAll('filter_operator');
  const filterValue = req.nextUrl.searchParams.getAll('filter_value');
  const relatedTables = req.nextUrl.searchParams.getAll('related_tables') || [];
  const sortField = req.nextUrl.searchParams.get('sort');
  const sortOrder = req.nextUrl.searchParams.get('type');

  const offset = (page - 1) * limit;
  return {
    limit,
    page,
    offset,
    filterKey,
    filterOperator,
    filterValue,
    relatedTables,
    sortParams:
      !sortField || !sortOrder
        ? []
        : [
            {
              field: sortField,
              order: sortOrder as 'asc' | 'desc',
            },
          ],
  };
};

export const buildPrismaWhereClause = (
  filterKey?: string[] | null,
  filterOperator?: string[] | null,
  filterValue?: string[] | null
) => {
  if (
    !filterKey ||
    !filterOperator ||
    !filterValue ||
    filterKey.length !== filterOperator.length ||
    filterKey.length !== filterValue.length
  ) {
    return {};
  }

  const whereClause: Record<string, any> = {};
  const globallyLikeConditions: any[] = [];

  for (let i = 0; i < filterKey.length; i++) {
    const keys = filterKey[i].split('.');
    const operator = filterOperator[i];
    const value = filterValue[i];
    const parsedFilterValue = !isNaN(Number(value)) ? Number(value) : value;

    if (operator === 'globallyLike' || operator === 'like') {
      const condition = {};
      let currentLevel: any = condition;
      for (let j = 0; j < keys.length; j++) {
        const key = keys[j];
        if (j === keys.length - 1) {
          currentLevel[key] = {
            contains: parsedFilterValue,
            mode: 'insensitive',
          };
        } else {
          currentLevel[key] = {};
          currentLevel = currentLevel[key];
        }
      }
      globallyLikeConditions.push(condition);
    } else {
      let currentLevel = whereClause;
      for (let j = 0; j < keys.length; j++) {
        const key = keys[j];
        if (j === keys.length - 1) {
          if (['every', 'some', 'none'].includes(operator)) {
            currentLevel[operator] = { id: parsedFilterValue };
          } else {
            currentLevel[key] = parsedFilterValue;
          }
        } else {
          currentLevel[key] = currentLevel[key] || {};
          currentLevel = currentLevel[key];
        }
      }
    }
  }

  if (globallyLikeConditions.length > 0) {
    whereClause.OR = globallyLikeConditions;
  }
  return whereClause;
};

export const buildPrismaIncludeClause = (tables?: string[] | null) => {
  if (!tables) {
    return {};
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const includeClause = tables.reduce<Record<string, any>>((acc, table) => {
    const parts = table.split('.');
    let current = acc;

    parts.forEach((part, index) => {
      if (!current[part]) {
        current[part] = {};
      }

      if (index === parts.length - 1) {
        current[part] = true;
      } else {
        if (!current[part].include) {
          current[part].include = {};
        }
        current = current[part].include;
      }
    });

    return acc;
  }, {});

  return includeClause;
};
export const transformForPrismaOrderBy = (
  sortParams: Array<{ field: string; order: 'asc' | 'desc' }>
) => {
  return sortParams.map((param) => ({
    [param.field]: param.order,
  }));
};
export const unauthorizedResponse = () => {
  return new Response(
    JSON.stringify({
      code: '401',
      message: 'Unauthorized',
    }),
    { status: 401, headers: { 'Content-Type': 'application/json' } }
  );
};

export const internalServerErrorResponse = (message?: string) => {
  return new Response(
    JSON.stringify({
      code: '500',
      data: null,
      message: message ?? 'Internal Server Error',
    }),
    { status: 500, headers: { 'Content-Type': 'application/json' } }
  );
};

export const successResponse = (
  data: unknown,
  meta?: MetaProps,
  message?: string
) => {
  return new Response(
    JSON.stringify({
      code: '200',
      data: data,
      message: message ?? 'Success',
      meta,
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
