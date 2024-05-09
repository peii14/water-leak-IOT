'use client';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import ArrowLink from '@/_components/shared/links/ArrowLink';
import Typography from '@/_components/shared/Typography';
import api from '@/_lib/axios';
import { buildURL } from '@/_lib/table';
import { ApiResponse } from '@/_types/api/api.type';
import { SupervisorRecommendationProps } from '@/_types/entity/supervisor-receomendations';
import RecommendationForm from '@/app/(supervisor)/supervisor/recommendation/[id]/_components/RecommendationForm';

export default function RegisterRecommendationPage() {
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
  // #region //* =========== Recommendation ===========
  const url = buildURL({
    baseUrl: `/supervisor-recommendation`,
    additionalParam: {
      filter_key: 'id',
      filter_operator: 'eq',
      filter_value: path,
      related_tables: ['draft.keywords', 'draft.status', 'students'],
    },
  });
  const { data: recommendationDetail } = useQuery<
    ApiResponse<SupervisorRecommendationProps[]>
  >({
    queryKey: [url],
    queryFn: async () => {
      return await api.get(url).then((res) => res.data);
    },
  });
  // #endregion //* =========== Recommendation ===========
  return (
    <main className='layout'>
      <section className=''>
        <ArrowLink href='/supervisor/recommendation' direction='left'>
          Back
        </ArrowLink>
        <Typography variant='h2' className='mt-5'>
          Add/Edit Recommendation
        </Typography>
      </section>
      <section className='mt-5 w-2/3'>
        <RecommendationForm existingData={recommendationDetail?.data[0]} />
      </section>
    </main>
  );
}
