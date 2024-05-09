'use client';
import { FolderArchiveIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import Typography from '@/_components/shared/Typography';
import ThesisAccessSpvTable from '@/app/(supervisor)/supervisor/thesis-access/_components/ThesisAccessSpvTable';

export default function ThesisAccessSupervisorPage() {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (
      session.status === 'unauthenticated' ||
      (session.status === 'authenticated' &&
        session.data.user.role.name !== 'Supervisor')
    )
      router.replace('/login');
  }, [router, session.data?.user.role, session.status]);
  return (
    <main className='layout'>
      <section className='flex items-center space-x-5'>
        <div className='scale-150'>
          <FolderArchiveIcon color='#0072BC' />
        </div>
        <Typography variant='sj3' className=''>
          Thesis Access
        </Typography>
      </section>
      <section className='mt-5'>
        <ThesisAccessSpvTable />
      </section>
    </main>
  );
}
