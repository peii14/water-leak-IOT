'use client';
import { BookMarkedIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import Button from '@/_components/shared/buttons/Button';
import Typography from '@/_components/shared/Typography';
import AddTopicAreaSupervisorModal from '@/app/(supervisor)/supervisor/topic-area/_components/TopicAreaSupervisorModal';
import TopicAreaSupervisorTable from '@/app/(supervisor)/supervisor/topic-area/_components/TopicAreaSupervisorTable';
export default function TopicAreaPage() {
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
      <section className='flex items-center justify-between'>
        <div className='flex items-center space-x-5'>
          <div className='scale-150'>
            <BookMarkedIcon />
          </div>
          <Typography variant='sj3' className=''>
            My Topic Area
          </Typography>
        </div>
        <div>
          <AddTopicAreaSupervisorModal title='New topic to the faculty'>
            {({ openModal }) => (
              <Button onClick={openModal}>Add New Topics</Button>
            )}
          </AddTopicAreaSupervisorModal>
        </div>
      </section>
      <section className='mt-5'>
        <TopicAreaSupervisorTable
          session={Number(session.data?.user.id)}
          faculty_id={Number(session.data?.user.faculty[0].id)}
        />
      </section>
    </main>
  );
}
