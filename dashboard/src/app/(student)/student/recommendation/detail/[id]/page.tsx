'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import Button from '@/_components/shared/buttons/Button';
import ArrowLink from '@/_components/shared/links/ArrowLink';
import Typography from '@/_components/shared/Typography';
import useMutationToast from '@/_hooks/toast/useMutationToast';
import useDialog from '@/_hooks/useDialog';
import ProposalIcon from '@/_icons/Proposal';
import api from '@/_lib/axios';
import { buildURL } from '@/_lib/table';
import { ApiResponse } from '@/_types/api/api.type';
import { SupervisorRecommendationProps } from '@/_types/entity/supervisor-receomendations';
import DetailThesisCard from '@/app/(deans)/deans/thesis-access/detail-thesis/[id]/_components/DetailThesisCard';

export default function DetilProposalStudentPage() {
  const session = useSession();
  const router = useRouter();
  const path = usePathname().split('/').pop();
  const dialog = useDialog();
  useEffect(() => {
    if (
      session.status === 'unauthenticated' ||
      (session.status === 'authenticated' &&
        session.data.user.role.name !== 'Student')
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
  const { data: thesisDetail, isLoading } = useQuery<
    ApiResponse<SupervisorRecommendationProps[]>
  >({
    queryKey: [url],
    queryFn: async () => {
      return await api.get(url).then((res) => res.data);
    },
  });
  // #endregion //* =========== Thesis ===========
  // #region //* =========== Take Thesis ===========
  const { mutateAsync: onRequestMutation } = useMutationToast<
    ApiResponse<undefined>,
    { id: string; student_id: string }
  >(
    useMutation(({ id, student_id }) => {
      return api
        .patch(`/supervisor-recommendation/request`, { id, student_id })
        .then((res) => res.data);
    }),
    {
      loading: 'Processing...',
      success: 'Recommendation propossed successfully',
      error: 'Failed to propossed recommendation',
    }
  );
  const onRequest = ({ name, id }: { name: string; id: string }) => {
    dialog({
      title: (
        <>
          Request <strong>{name}</strong>
        </>
      ),
      description: (
        <>
          Are you sure to take <strong>{name}</strong>?
        </>
      ),
      submitText: 'Take',
      variant: 'warning',
      listenForLoadingToast: true,
    }).then(() => {
      if (session.data)
        onRequestMutation({ id: id, student_id: session.data?.user.id });
    });
  };
  // #endregion //* =========== Take Thesis ===========

  return (
    <main className='layout'>
      <ArrowLink href='/student/recommendation' direction='left'>
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
      <section className='my-5 flex items-center justify-between'>
        <Typography variant='h2' className='mt-5'>
          Recommendation Detail
        </Typography>
        {thesisDetail?.data[0].students.find(
          (id) => Number(id.id) === Number(session.data?.user.id)
        ) === undefined ? (
          <Button
            className='h-max'
            onClick={() =>
              onRequest({
                id: thesisDetail?.data[0].id.toString() ?? '',
                name: thesisDetail?.data[0].draft?.title ?? '',
              })
            }
          >
            Take
          </Button>
        ) : null}
      </section>
      {!isLoading && thesisDetail?.data.length !== 0 ? (
        <>
          <DetailThesisCard
            isLoading={isLoading}
            proposal={thesisDetail?.data[0] ?? undefined}
          />
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
