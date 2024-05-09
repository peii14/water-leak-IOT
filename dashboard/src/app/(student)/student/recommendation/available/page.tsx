'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import Typography from '@/_components/shared/Typography';
import RecommendationIcon from '@/_icons/Recommendation';
import AvailableRecomendationStudentTable from '@/app/(student)/student/recommendation/available/_components/AvailableRecomendationList';

export default function AvailableRecommendationStudentPage() {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (
      session.status === 'unauthenticated' ||
      (session.status === 'authenticated' &&
        session.data.user.role.name !== 'Student')
    )
      router.replace('/login');
  }, [router, session.data?.user.role, session.status]);
  return (
    <main className='layout'>
      <section className='flex items-center space-x-5'>
        <div className='scale-150'>
          <RecommendationIcon />
        </div>
        <Typography variant='sj3' className=''>
          Available Recommendation
        </Typography>
      </section>
      <section className='mt-5'>
        <AvailableRecomendationStudentTable
          session={Number(session.data?.user.id)}
          facultyId={Number(session.data?.user.faculty[0].id)}
        />
      </section>
    </main>
  );
}
