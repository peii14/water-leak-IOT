import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import ArrowLink from '@/_components/shared/links/ArrowLink';
import Typography from '@/_components/shared/Typography';
import api from '@/_lib/axios';
import { buildURL } from '@/_lib/table';
import { ApiResponse } from '@/_types/api/api.type';
import { ProposalsProps } from '@/_types/entity/proposals';
import ProposalForm from '@/app/(student)/student/proposal/[id]/_components/ProposalForm';

export default function RegisterProposalPage() {
  const session = useSession();
  const router = useRouter();
  const path = usePathname().split('/').pop();
  useEffect(() => {
    if (
      session.status === 'unauthenticated' ||
      (session.status === 'authenticated' &&
        session.data.user.role.name !== 'Student')
    )
      router.replace('/login');
  }, [router, session.data?.user.role, session.status]);
  // #region //* =========== Proposal ===========
  const url = buildURL({
    baseUrl: `/proposal`,
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
  const { data: proposalDetail } = useQuery<ApiResponse<ProposalsProps[]>>({
    queryKey: [url],
    queryFn: async () => {
      return await api.get(url).then((res) => res.data);
    },
  });
  // #endregion //* =========== Proposal ===========
  return (
    <main className='layout'>
      <section className=''>
        <ArrowLink href='/student/proposal' direction='left'>
          Back
        </ArrowLink>
        <Typography variant='h2' className='mt-5'>
          Add/Edit Proposal
        </Typography>
      </section>
      <section className='mt-5 w-2/3'>
        <ProposalForm existingData={proposalDetail?.data[0]} />
      </section>
    </main>
  );
}
