'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import Typography from '@/_components/shared/Typography';
import ProposalIcon from '@/_icons/Proposal';
import ProposalSupervisorTable from '@/app/(supervisor)/supervisor/proposal/_components/ProposalSupervisorTable';

export default function ProposalSupervisorPage() {
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
      <section>
        <div className='flex items-center space-x-5'>
          <div className='scale-150'>
            <ProposalIcon />
          </div>
          <Typography variant='sj3' className=''>
            Proposals
          </Typography>
        </div>
      </section>
      <section className='mt-3'>
        <ProposalSupervisorTable
          session={Number(session.data?.user.id)}
          facultyId={Number(session.data?.user.faculty[0].id)}
        />
      </section>
    </main>
  );
}
