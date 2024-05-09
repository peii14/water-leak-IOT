'use client';
import { Group } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import Typography from '@/_components/shared/Typography';
import MajorsAdminTable from '@/app/(deans)/deans/majors/_components/MajorsTable';

export default function MajorsAdminPage() {
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
      <section className='flex items-center space-x-5'>
        <div className='scale-150'>
          <Group size={25} />
        </div>
        <Typography variant='sj3' className=''>
          Majors
        </Typography>
      </section>
      <section className='mt-5'>
        <MajorsAdminTable />
      </section>
    </main>
  );
}
