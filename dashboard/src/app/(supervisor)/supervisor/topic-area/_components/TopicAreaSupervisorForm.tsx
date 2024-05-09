'use client';

import { useMutation } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Button from '@/_components/shared/buttons/Button';
import ServerSelectInput from '@/_components/shared/forms/ServerSelectInput';
import api from '@/_lib/axios';

type TopicAreaFormSubmit = {
  id: number;
  keywords_id: string;
};

export default function TopicAreaSupervisorForm({
  faculty_id,
  refetch,
}: {
  refetch: () => void;
  faculty_id: number;
}) {
  // #region //* =========== Form ===========
  const methods = useForm<TopicAreaFormSubmit>({
    mode: 'onTouched',
  });
  const { handleSubmit, reset } = methods;
  //#endregion  //*======== Form ===========
  //#region  //*=========== Form Submit ===========
  const onSubmit: SubmitHandler<TopicAreaFormSubmit> = (data) => {
    mutate(data);
  };
  const patchTopics = async (data: TopicAreaFormSubmit) => {
    const res = await api.patch('/master/keywords/account', data);
    if (typeof res === 'undefined') {
      toast.error('Something went wrong');
      return res;
    }
  };
  const mutation = useMutation({
    mutationFn: patchTopics,

    onSuccess: () => {
      refetch();
      toast.dismiss();
      toast.success('Added new topic area successfully');
      reset();
    },
    onError: (error: Error) => {
      toast.dismiss();
      toast.error(error.message);
    },
    onMutate: () => {
      toast.loading('Processing...');
    },
  });
  const { mutate } = mutation;
  // #endregion  //*======== Form Submit ===========
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ServerSelectInput
          id='keywords_id'
          label='Add my new topic area'
          route={`/master/keywords?filter_key=faculty_id&filter_operation=eq&filter_value=${faculty_id}`}
        />

        <Button
          type='submit'
          rightIcon={Plus}
          variant='primary'
          className='mt-5'
        >
          Submit
        </Button>
      </form>
    </FormProvider>
  );
}
