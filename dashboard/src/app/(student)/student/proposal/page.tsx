'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { PlusIcon, Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import Button from '@/_components/shared/buttons/Button';
import ButtonLink from '@/_components/shared/links/ButtonLink';
import Typography from '@/_components/shared/Typography';
import useMutationToast from '@/_hooks/toast/useMutationToast';
import useDialog from '@/_hooks/useDialog';
import ProposalIcon from '@/_icons/Proposal';
import api from '@/_lib/axios';
import { buildURL } from '@/_lib/table';
import { ApiResponse } from '@/_types/api/api.type';
import { ProposalsProps } from '@/_types/entity/proposals';
import DetailThesisCard from '@/app/(deans)/deans/thesis-access/detail-thesis/[id]/_components/DetailThesisCard';

export default function ProposalStudentPage() {
  const session = useSession();
  const router = useRouter();
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
    baseUrl: `/proposal`,
    additionalParam: {
      filter_key: 'student_id',
      filter_operator: 'eq',
      filter_value: session.data?.user.id,
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
  // #region //* =========== Delete Data ===========
  const { mutateAsync: onDeleleteMutation } = useMutationToast<
    ApiResponse<undefined>,
    { id: string }
  >(
    useMutation(({ id }) => {
      return api
        .delete(`/proposal`, { data: { id: id } })
        .then((res) => res.data);
    }),
    {
      loading: 'Removing proposal...',
      success: 'Proposal removed successfully',
      error: 'Failed to remove proposal',
    }
  );
  const onDelete = async ({ id, name }: { id: string; name: string }) => {
    dialog({
      title: (
        <>
          Proposal <strong>{name}</strong> will be deleted.
        </>
      ),
      description: 'This action cannot be undone.',
      submitText: 'Delete',
      variant: 'danger',
      listenForLoadingToast: true,
    }).then(() => {
      onDeleleteMutation({ id: id }).then(() => refetch());
    });
  };

  // #endregion  //*======== Delete Data ===========
  return (
    <main className='layout'>
      <section className='flex items-center justify-between'>
        <aside className='flex items-center space-x-5'>
          <div className='scale-150'>
            <ProposalIcon />
          </div>
          <Typography variant='sj3'>Proposal</Typography>
        </aside>
        <ButtonLink
          href='/student/proposal/register'
          leftIcon={PlusIcon}
          variant='primary'
        >
          Proposal
        </ButtonLink>
      </section>
      <section className='my-5 flex justify-between'>
        <Typography variant='h2' className='mt-5'>
          Proposal Detail
        </Typography>
        {!isLoading && thesisDetail?.data.length !== 0 ? (
          <div>
            <Button
              leftIcon={Trash2Icon}
              className='border-red-500 text-red-500 hover:bg-red-100'
              variant='outline'
              onClick={() =>
                onDelete({
                  id: thesisDetail?.data[0].id.toString() ?? '',
                  name: thesisDetail?.data[0].draft.title ?? '',
                })
              }
            >
              Delete
            </Button>
            {thesisDetail?.data[0].draft.status.name === 'Revision' ? (
              <ButtonLink
                href={`/student/proposal/edit/${thesisDetail?.data[0].id}`}
                variant='primary'
              >
                Edit
              </ButtonLink>
            ) : (
              <></>
            )}
          </div>
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
            You haven’t upload proposal yet.
          </Typography>
        </section>
      )}
    </main>
  );
}
