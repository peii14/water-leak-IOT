'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import Typography from '@/_components/shared/Typography';

export default function DeansDashboard() {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (
      session.status === 'unauthenticated' ||
      (session.status === 'authenticated' &&
        session.data?.user.role.name !== 'Deans')
    )
      router.replace('/login');
  }, [router, session.data?.user.role, session.status]);
  return (
    <main className='layout'>
      <section>
        <Typography variant='sj2' className=''>
          Hello,{' '}
          <span className='text-primary-500'>{session.data?.user.name} !</span>
        </Typography>
      </section>
    </main>
  );
}
