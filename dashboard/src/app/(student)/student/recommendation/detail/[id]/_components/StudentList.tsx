'use client';
import { useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Radio from '@/_components/shared/forms/Radio';
import Typography from '@/_components/shared/Typography';
import useDialog from '@/_hooks/useDialog';
import api from '@/_lib/axios';
import logger from '@/_lib/logger';
import { buildURL } from '@/_lib/table';
import { ApiResponse } from '@/_types/api/api.type';
import { SupervisorRecommendationProps } from '@/_types/entity/supervisor-receomendations';

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
  // #region //* =========== Update Status ===========
  const method = useForm<SelectedStudent>({
    defaultValues: {
      student_id: thesisDetail?.data[0].draft?.status.id,
    },
  });
  const { watch, resetField } = method;
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
        resetField('student_id');
      }
    });
  }, [dialog, refetch, resetField, thesisDetail?.data, watchStatusId]);

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
    <section className='mt-5 min-h-[30vh] rounded-xl border border-gray-100 bg-white p-5 shadow-xl'>
      <Typography variant='h2' className='mt-5'>
        Student List:
      </Typography>
      <FormProvider {...method}>
        <form>
          {thesisDetail?.data[0].students.length ? (
            thesisDetail?.data[0].students.map((student) => (
              <Radio
                key={student.id}
                name='student_id'
                value={student.id.toString()}
                label={student.name}
              />
            ))
          ) : (
            <Typography variant='b1'>No student available</Typography>
          )}
        </form>
      </FormProvider>
    </section>
  );
}
