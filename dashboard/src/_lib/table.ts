import queryString, { StringifyOptions } from 'query-string';

import { ServerTableState } from '@/_components/shared/table/ServerTable';

type BuildPaginationTableParam = {
  /** API Base URL, with / on the front */
  baseUrl: string;
  tableState: ServerTableState;
  /** Parameter addition
   * @example { include: ['user'] }
   */
  additionalParam?: Record<string, unknown>;
  options?: StringifyOptions;
};
type BuildPaginationTableURL = (props: BuildPaginationTableParam) => string;

type BuildURLParam = {
  /** API Base URL, with / on the front */
  baseUrl: string;
  additionalParam?: Record<string, unknown>;
  options?: StringifyOptions;
};
type BuildURLPlain = (props: BuildURLParam) => string;

export const buildURL: BuildURLPlain = ({
  baseUrl,
  additionalParam,
  options,
}) => {
  const queryParams = queryString.stringify(
    {
      ...additionalParam,
    },
    {
      arrayFormat: 'none',
      skipEmptyString: true,
      ...options,
    }
  );
  const url = additionalParam ? `${baseUrl}?${queryParams}` : baseUrl;
  return url;
};

export const buildPaginatedTableURL: BuildPaginationTableURL = ({
  baseUrl,
  tableState,
  additionalParam,
  options,
}) => {
  const queryParams = queryString.stringify(
    {
      limit: tableState.pagination.pageSize,
      page: tableState.pagination.pageIndex + 1,
      sort: tableState.sorting.length > 0 ? tableState.sorting[0].id : '',
      type:
        tableState.sorting.length > 0
          ? tableState.sorting[0].desc
            ? 'desc'
            : 'asc'
          : '',
      keyword: tableState.globalFilter,
      ...additionalParam,
    },
    {
      arrayFormat: 'none',
      skipEmptyString: true,
      ...options,
    }
  );

  return `${baseUrl}?${queryParams}`;
};
export const buildICDTableURL: BuildPaginationTableURL = ({
  baseUrl,
  tableState,
  additionalParam,
  options,
}) => {
  const queryParams = queryString.stringify(
    {
      keyword: tableState.globalFilter,
      ...additionalParam,
    },
    {
      arrayFormat: 'bracket',
      skipEmptyString: true,
      ...options,
    }
  );
  return `${baseUrl}?${queryParams}`;
};
