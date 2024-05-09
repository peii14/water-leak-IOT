'use client';

import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

import Button from '@/_components/shared/buttons/Button';
import Typography from '@/_components/shared/Typography';
import BooksIcon from '@/_icons/Books';
import clsxm from '@/_lib/clsxm';

export default function Header() {
  const router = useRouter();
  const path = usePathname();
  const session = useSession();
  return (
    <header className='fixed z-30 hidden w-screen border-b bg-white py-1.5 shadow-sm md:block'>
      <div className='mx-auto flex  flex-row items-center justify-between rounded-xl  px-5 py-3'>
        <div className='flex space-x-3'>
          <BooksIcon />
          <Typography variant='h4'>Smart Home - Water Management System</Typography>
        </div>
        <div
          className={clsxm(
            path === '/login' && 'hidden',
            'flex items-center space-x-3'
          )}
        >
          <div>
            <Typography variant='c1'>
              {session.data?.user.role.name ?? ''}
            </Typography>
            <Typography variant='s2'>
              {session.data?.user.name ?? ''}
            </Typography>
          </div>
          <Button
            className={clsxm(path === '/login' && 'hidden')}
            variant='ghost'
            onClick={() => {
              signOut();
              router.replace('/login');
            }}
          >
            Sign out
          </Button>
        </div>
      </div>
    </header>
  );
}
