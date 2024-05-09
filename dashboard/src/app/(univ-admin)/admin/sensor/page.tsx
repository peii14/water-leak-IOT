'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import Typography from '@/_components/shared/Typography';
import FacultyIcon from '@/_icons/Faculty';
import FacultyAdminTable from '@/app/(univ-admin)/admin/sensor/_components/FacultyTable';
export default function FacultyAdminPage() {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (
      session.status === 'unauthenticated' ||
      (session.status === 'authenticated' &&
        session.data.user.role.name !== 'Admin')
    )
      router.replace('/login');
  }, [router, session.data?.user.role, session.status]);
  return (
    <main className='layout'>
      <section className='flex items-center space-x-5'>
        <div className='scale-150'>
          <FacultyIcon />
        </div>
        <Typography variant='sj3' className=''>
          Sensors
        </Typography>
      </section>
      <section className='mt-5'>
        {/* <FacultyAdminTable /> */}
      </section>
    </main>
  );
}
