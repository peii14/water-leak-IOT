import Typography from '@/_components/shared/Typography';

export default function Keywords({ keywords }: { keywords: string }) {
  return (
    <aside className='bg-primary-100 border-primary-500 w-full rounded-lg border-2 px-2.5 py-1'>
      <Typography className='text-center' variant='b3' color='secondary'>
        {keywords}
      </Typography>
    </aside>
  );
}
