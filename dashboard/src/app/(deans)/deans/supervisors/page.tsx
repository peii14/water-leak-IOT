'use client';
import { PlusIcon, User2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import ButtonLink from '@/_components/shared/links/ButtonLink';
import Typography from '@/_components/shared/Typography';
import SupervisorAccountTable from '@/app/(deans)/deans/supervisors/_components/SupervisorAccountTable';

export default function UnivAdminAccounts() {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (
      session.status === 'unauthenticated' ||
      (session.status === 'authenticated' &&
        session.data.user.role.name !== 'Deans')
    )
      router.replace('/login');
  }, [router, session.data?.user.role, session.status]);
  return (
    <main className='layout'>
      <section className='flex items-center justify-between'>
        <aside className='flex items-center space-x-5'>
          <div className='scale-150'>
            <User2Icon color='#0072BC' />
          </div>
          <Typography variant='sj3' className=''>
            Supervisor
          </Typography>
        </aside>
        <ButtonLink href='/deans/supervisors/register' rightIcon={PlusIcon}>
          Add
        </ButtonLink>
      </section>
      <section className='mt-5'>
        <SupervisorAccountTable />
      </section>
    </main>
  );
}
