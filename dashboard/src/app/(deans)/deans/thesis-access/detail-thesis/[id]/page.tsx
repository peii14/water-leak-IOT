'use client';
import { useQuery } from '@tanstack/react-query';
import { FolderArchiveIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import Typography from '@/_components/shared/Typography';
import api from '@/_lib/axios';
import { buildURL } from '@/_lib/table';
import { ApiResponse } from '@/_types/api/api.type';
import { ProposalsProps } from '@/_types/entity/proposals';
import DetailThesisCard from '@/app/(deans)/deans/thesis-access/detail-thesis/[id]/_components/DetailThesisCard';

export default function DetailThesisDeansPage() {
  const session = useSession();
  const router = useRouter();
  const id = usePathname().split('/').pop();
  useEffect(() => {
    if (
      session.status === 'unauthenticated' ||
      (session.status === 'authenticated' &&
        session.data.user.role.name !== 'Deans')
    )
      router.replace('/login');
  }, [router, session.data?.user.role, session.status]);

  // #region //* =========== Thesis ===========
  const url = buildURL({
    baseUrl: `/thesis/${id}`,
    additionalParam: {},
  });
  const { data: thesisDetail, isLoading } = useQuery<
    ApiResponse<ProposalsProps>
  >({
    queryKey: ['url'],
    queryFn: async () => {
      const res = await api.get(url).then((res) => res.data);
      return res;
    },
  });
  // #endregion //* =========== Thesis ===========
  return (
    <main className='layout'>
      <section>
        <div className='scale-150'>
          <FolderArchiveIcon color='#0072BC' />
        </div>
        <Typography variant='sj3' className=''>
          Detail Thesis
        </Typography>
      </section>
      <DetailThesisCard proposal={thesisDetail?.data} isLoading={isLoading} />
    </main>
  );
}
