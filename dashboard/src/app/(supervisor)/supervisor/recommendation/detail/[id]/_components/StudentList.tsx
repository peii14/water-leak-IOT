'use client';
import { ColumnDef } from '@tanstack/react-table';
import { useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Radio from '@/_components/shared/forms/Radio';
import UnderlineLink from '@/_components/shared/links/UnderlineLink';
import PaginatedTable from '@/_components/shared/table/PaginatedTable';
import Typography from '@/_components/shared/Typography';
import useDialog from '@/_hooks/useDialog';
import api from '@/_lib/axios';
import logger from '@/_lib/logger';
import { buildURL } from '@/_lib/table';
import { ApiResponse } from '@/_types/api/api.type';
import { SupervisorRecommendationProps } from '@/_types/entity/supervisor-receomendations';
import { UserProps } from '@/_types/entity/user';

type SelectedStudent = {
  student_id: number;
};
export default function StudentList({
  thesisDetail,
  refetch,
}: {
  thesisDetail?: ApiResponse<SupervisorRecommendationProps[]>;
  refetch: () => void;
}) {
  const dialog = useDialog();
  // #region //* =========== Table ===========
  const columns: ColumnDef<UserProps>[] = [
    {
      header: 'No',
      cell: (cell) => cell.row.index + 1,
      size: 5,
    },
    {
      header: 'name',
      cell: (cell) => (
        <UnderlineLink href={`mailto:${cell.row.original.email}`}>
          {cell.row.original.name}
        </UnderlineLink>
      ),
    },
    {
      header: 'Approved',
      cell: (cell) => (
        <Radio
          checked={
            cell.row.original.id === thesisDetail?.data[0].draft?.status.id
          }
          name='student_id'
          value={cell.row.original.id.toString()}
          label=''
        />
      ),
    },
  ];
  // #endregion //* =========== Table ===========

  // #region //* =========== Update Status ===========
  const method = useForm<SelectedStudent>({
    defaultValues: {
      student_id: thesisDetail?.data[0].draft?.status.id,
    },
  });
  const { watch } = method;
  // Cache the student_id for dependency tracking
  const watchStatusId = watch().student_id;

  const updateStatus = useCallback(async () => {
    dialog({
      title: 'You are about to accept this student',
      description: 'Are you sure you want to accept this student?',
      submitText: 'Change Status',
      variant: 'warning',
      listenForLoadingToast: true,
    }).then(async () => {
      if (watchStatusId) {
        const url = buildURL({
          baseUrl: `/supervisor-recommendation`,
        });
        await toast.promise(
          api.patch(url, {
            id: thesisDetail?.data[0].id,
            student_id: watchStatusId,
          }),
          {
            loading: 'Updating status...',
            success: 'Status updated successfully',
            error: 'Failed to update status',
          }
        );

        refetch();
      }
    });
  }, [dialog, refetch, thesisDetail?.data, watchStatusId]);

  useEffect(() => {
    logger(watchStatusId);
    if (
      watchStatusId &&
      Number(watchStatusId) !== Number(thesisDetail?.data[0].draft?.status.id)
    )
      updateStatus();
  }, [thesisDetail?.data, updateStatus, watchStatusId]);
  // #endregion //* =========== Update Status ===========

  return (
    <section className='mt-5 min-h-[20vh] rounded-xl border border-gray-100 bg-white p-5 shadow-xl'>
      <Typography variant='h2' className='my-5'>
        Applicants
      </Typography>
      <FormProvider {...method}>
        <form>
          <PaginatedTable
            columns={columns}
            data={thesisDetail?.data[0].students || []}
            withFilter
          />
        </form>
      </FormProvider>
    </section>
  );
}
