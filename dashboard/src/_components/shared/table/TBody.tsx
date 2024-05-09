import { flexRender, RowData, Table } from '@tanstack/react-table';
import * as React from 'react';

import Typography from '@/_components/shared/Typography';
import clsxm from '@/_lib/clsxm';

type TBodyProps<T extends RowData> = {
  table: Table<T>;
} & React.ComponentPropsWithoutRef<'div'>;

export default function TBody<T extends RowData>({
  className,
  table,
  ...rest
}: TBodyProps<T>) {
  return (
    <tbody
      className={clsxm('divide-typo-divider divide-y bg-white', className)}
      {...rest}
    >
      {table.getRowModel().rows.map((row, index) => (
        <tr
          key={row.id}
          className={clsxm(index % 2 === 0 ? 'bg-white' : 'bg-gray-50')}
        >
          {row.getVisibleCells().map((cell) => (
            <Typography
              key={cell.id}
              as='td'
              variant='b2'
              color='secondary'
              className='truncate whitespace-nowrap py-4 pl-[20px] pr-3'
              title={cell.getValue() as string}
              style={{ maxWidth: cell.column.getSize() }}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </Typography>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
