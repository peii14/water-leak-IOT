export type ApiResponse<T> = {
  code: string;
  data: T;
  status: string;
};

export type ApiError = {
  message: string;
};

export type UninterceptedApiErrorData = Record<string, string[]>;

export type UninterceptedApiError = {
  message: string | Record<string, string[]>;
};

export interface PaginatedApiResponse<T> {
  code: number;
  status: string;
  message?: string;
  data: T;
  meta: MetaProps;
}
export interface MetaProps {
  last_page: number;
  total: number;
}
