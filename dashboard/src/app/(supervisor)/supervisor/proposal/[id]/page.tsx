'use client';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import ServerSelectInput from '@/_components/shared/forms/ServerSelectInput';
import ArrowLink from '@/_components/shared/links/ArrowLink';
import Typography from '@/_components/shared/Typography';
import useDialog from '@/_hooks/useDialog';
import ProposalIcon from '@/_icons/Proposal';
import api from '@/_lib/axios';
import logger from '@/_lib/logger';
import { buildURL } from '@/_lib/table';
import { ApiResponse } from '@/_types/api/api.type';
import { ProposalsProps } from '@/_types/entity/proposals';
import DetailThesisCard from '@/app/(deans)/deans/thesis-access/detail-thesis/[id]/_components/DetailThesisCard';

type StatusProps = {
  status_id: number;
};

export default function ProposalSupervisorPage() {
  const session = useSession();
  const router = useRouter();
  const dialog = useDialog();
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
    baseUrl: `/proposal`,
    additionalParam: {
      filter_key: 'id',
      filter_operator: 'eq',
      filter_value: path,
      related_tables: [
        'draft.keywords',
        'draft.status',
        'student',
        'supervisor',
      ],
    },
  });
  const {
    data: thesisDetail,
    isLoading,
    refetch,
  } = useQuery<ApiResponse<ProposalsProps[]>>({
    queryKey: [url],
    queryFn: async () => {
      return await api.get(url).then((res) => res.data);
    },
  });
  // #endregion //* =========== Thesis ===========
  // #region //* =========== Update Status ===========
  const method = useForm<StatusProps>({
    defaultValues: {
      status_id: thesisDetail?.data[0].draft.status.id,
    },
  });
  const { watch, resetField } = method;

  const watchStatusId = watch().status_id; // Cache the status_id for dependency tracking

  // Define the callback with useCallback
  const updateStatus = useCallback(async () => {
    dialog({
      title: 'You are about to change the status of this proposal',
      description:
        'Are you sure you want to change the status of this proposal?',
      submitText: 'Change Status',
      variant: 'warning',
      listenForLoadingToast: true,
    }).then(async () => {
      if (watchStatusId) {
        const url = buildURL({
          baseUrl: `/proposal`,
        });
        await toast.promise(
          api.patch(url, {
            id: thesisDetail?.data[0].id,
            status_id: watchStatusId,
          }),
          {
            loading: 'Updating status...',
            success: 'Status updated successfully',
            error: 'Failed to update status',
          }
        );

        refetch();
        resetField('status_id');
      }
    });
  }, [dialog, refetch, resetField, thesisDetail?.data, watchStatusId]);

  useEffect(() => {
    logger(watchStatusId);
    if (
      watchStatusId &&
      Number(watchStatusId) !== Number(thesisDetail?.data[0].draft.status.id)
    )
      updateStatus();
  }, [thesisDetail?.data, updateStatus, watchStatusId]);
  // #endregion //* =========== Update Status ===========
  return (
    <main className='layout'>
      <ArrowLink href='/supervisor/proposal' direction='left'>
        Back
      </ArrowLink>
      <section className='mt-3 flex items-center justify-between'>
        <aside className='flex items-center space-x-5'>
          <div className='scale-150'>
            <ProposalIcon />
          </div>
          <Typography variant='sj3'>Proposal</Typography>
        </aside>
      </section>
      <section className='my-5 flex justify-between'>
        <Typography variant='h2' className='mt-5'>
          Proposal Detail
        </Typography>
        {!isLoading && thesisDetail?.data.length !== 0 ? (
          <FormProvider {...method}>
            <form>
              <ServerSelectInput
                id='status_id'
                label='Change proposal status'
                placeholder='Proposal Status'
                route='/master/status?filter_key=type&filter_operator=eq&filter_value=1'
              />
            </form>
          </FormProvider>
        ) : (
          <></>
        )}
      </section>
      {!isLoading && thesisDetail?.data.length !== 0 ? (
        <DetailThesisCard
          isLoading={isLoading}
          proposal={thesisDetail?.data[0] ?? undefined}
        />
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
