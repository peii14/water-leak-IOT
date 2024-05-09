import clsx from 'clsx';

import Typography from '@/_components/shared/Typography';

type StatusTagsProps = {
  readonly status: string;
  readonly variant: 'success' | 'danger' | 'warning' | 'neutral';
};

export default function StatusTags({ status, variant }: StatusTagsProps) {
  return (
    <div
      className={clsx(
        'w-full rounded-xl px-2 py-1 text-center',
        variant === 'success'
          ? 'bg-green-400'
          : variant === 'danger'
          ? 'bg-red-500'
          : variant === 'warning'
          ? 'bg-yellow-400'
          : variant === 'neutral'
          ? 'bg-gray-400'
          : 'bg-white'
      )}
    >
      <Typography variant='b2' className='text-white'>
        {status}
      </Typography>
    </div>
  );
}
