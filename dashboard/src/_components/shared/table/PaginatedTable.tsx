import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';
import { FiList } from 'react-icons/fi';

import Filter from '@/_components/shared/table/Filter';
import PaginationControl from '@/_components/shared/table/PaginationControl';
import TBody from '@/_components/shared/table/TBody';
import THead from '@/_components/shared/table/THead';
import TOption from '@/_components/shared/table/TOption';
import clsxm from '@/_lib/clsxm';

type PaginatedTableProps<T extends object> = {
  data: T[];
  columns: ColumnDef<T>[];
  pageSize?: number;
  omitSort?: boolean;
  withFilter?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

export default function PaginatedTable<T extends object>({
  className,
  columns,
  data,
  pageSize = 10,
  omitSort = false,
  withFilter = false,
  ...rest
}: PaginatedTableProps<T>) {
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize,
      },
    },
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className={clsxm('flex flex-col', className)} {...rest}>
      <div className='flex justify-between'>
        {withFilter && <Filter table={table} />}
        <div className='flex gap-3'>
          <TOption
            icon={<FiList className='text-typo-secondary' />}
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 25].map((page) => (
              <option key={page} value={page}>
                {page} Entries
              </option>
            ))}
          </TOption>
        </div>
      </div>
      <div className='-mx-4 -my-2 mt-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
          <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-300'>
              <colgroup>
                {columns.map((column) => (
                  <col
                    key={column.id}
                    span={1}
                    style={{
                      width: column.size ? column.size : 'auto',
                    }}
                  />
                ))}
              </colgroup>
              <THead table={table} omitSort={omitSort} />
              <TBody table={table} />
            </table>
          </div>
        </div>
      </div>

      <PaginationControl table={table} data={data} className='mt-4' />
    </div>
  );
}
