'use client';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import ArrowLink from '@/_components/shared/links/ArrowLink';
import Typography from '@/_components/shared/Typography';
import ProposalIcon from '@/_icons/Proposal';
import api from '@/_lib/axios';
import { buildURL } from '@/_lib/table';
import { ApiResponse } from '@/_types/api/api.type';
import { SupervisorRecommendationProps } from '@/_types/entity/supervisor-receomendations';
import DetailThesisCard from '@/app/(deans)/deans/thesis-access/detail-thesis/[id]/_components/DetailThesisCard';
import StudentList from '@/app/(supervisor)/supervisor/recommendation/detail/[id]/_components/StudentList';

export default function ProposalSupervisorPage() {
  const session = useSession();
  const router = useRouter();
  const path = usePathname().split('/').pop();
  useEffect(() => {
    if (
      session.status === 'unauthenticated' ||
      (session.status === 'authenticated' &&
        session.data.user.role.name !== 'Supervisor')
    )
      router.replace('/login');
  }, [router, session.data?.user.role, session.status]);
  // #region //* =========== Thesis ===========
  const url = buildURL({
    baseUrl: `/supervisor-recommendation`,
    additionalParam: {
      filter_key: 'id',
      filter_operator: 'eq',
      filter_value: path,
      related_tables: [
        'draft.keywords',
        'draft.status',
        'supervisor',
        'students',
      ],
    },
  });
  const {
    data: thesisDetail,
    isLoading,
    refetch,
  } = useQuery<ApiResponse<SupervisorRecommendationProps[]>>({
    queryKey: [url],
    queryFn: async () => {
      return await api.get(url).then((res) => res.data);
    },
  });
  // #endregion //* =========== Thesis ===========

  return (
    <main className='layout'>
      <ArrowLink href='/supervisor/recommendation' direction='left'>
        Back
      </ArrowLink>
      <section className='mt-3 flex items-center justify-between'>
        <aside className='flex items-center space-x-5'>
          <div className='scale-150'>
            <ProposalIcon />
          </div>
          <Typography variant='sj3'>Recommendation</Typography>
        </aside>
      </section>
      <section className='my-5 flex justify-between'>
        <Typography variant='h2' className='mt-5'>
          Recommendation Detail
        </Typography>
      </section>
      {!isLoading && thesisDetail?.data.length !== 0 ? (
        <>
          <DetailThesisCard
            isLoading={isLoading}
            proposal={thesisDetail?.data[0] ?? undefined}
          />
          <StudentList thesisDetail={thesisDetail} refetch={refetch} />
        </>
      ) : (
        <section className='relative mt-5 min-h-[68vh] rounded-xl border border-gray-100 bg-white p-5 shadow-xl'>
          <Typography
            variant='b2'
            color='secondary'
            className='absolute top-1/2 w-full -translate-y-1/2 text-center'
          >
            No proposal for you.
          </Typography>
        </section>
      )}
    </main>
  );
}
