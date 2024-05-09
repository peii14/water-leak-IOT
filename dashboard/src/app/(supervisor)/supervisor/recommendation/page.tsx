'use client';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import ButtonLink from '@/_components/shared/links/ButtonLink';
import Typography from '@/_components/shared/Typography';
import RecommendationIcon from '@/_icons/Recommendation';
import RecomendationSupervisorTable from '@/app/(supervisor)/supervisor/recommendation/_components/RecomendationSupervisorTable';

export default function RecomendationSupervisorPage() {
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
      <section className='flex justify-between'>
        <div className='flex items-center space-x-5'>
          <div className='scale-150'>
            <RecommendationIcon />
          </div>
          <Typography variant='sj3' className=''>
            Recommendation
          </Typography>
        </div>
        <ButtonLink
          className='h-max'
          href='/supervisor/recommendation/register'
          leftIcon={PlusIcon}
        >
          Recommendation
        </ButtonLink>
      </section>
      <section className='mt-3'>
        <RecomendationSupervisorTable
          session={Number(session.data?.user.id)}
          facultyId={Number(session.data?.user.faculty[0].id)}
        />
      </section>
    </main>
  );
}
