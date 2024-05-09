import { Record } from '@prisma/client/runtime/library';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FilterParams = Record<string, any>;

export interface AdditionalParam extends FilterParams {
  tableState?: {
    globalFilter?: string;
    page?: number;
    limit?: number;
  };
}
