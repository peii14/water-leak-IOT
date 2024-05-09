'use client';

import clsx from 'clsx';

import Typography from '@/_components/shared/Typography';

type TableInputProps = {
  className?: string;
  header: string[];
  children: React.ReactNode;
};
export default function TableInput({
  header,
  className,
  children,
}: TableInputProps) {
  return (
    <table className={clsx('w-full table-auto', className)}>
      <thead>
        <tr className='border-y-2'>
          {header.map((item, index) => (
            <th className='py-3 text-left' key={index}>
              <Typography variant='s3' color='secondary'>
                {item}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
