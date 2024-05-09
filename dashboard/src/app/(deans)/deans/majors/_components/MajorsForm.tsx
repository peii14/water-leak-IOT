'use client';

import { useMutation } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Button from '@/_components/shared/buttons/Button';
import Input from '@/_components/shared/forms/Input';
import api from '@/_lib/axios';

type GroupFormProps = {
  name: string;
};

export default function MajorsAdminForm({ refetch }: { refetch: () => void }) {
  // #region //* =========== Form ===========
  const methods = useForm<GroupFormProps>({
    mode: 'onTouched',
  });
  const { handleSubmit, reset, resetField } = methods;
  //#endregion  //*======== Form ===========
  //#region  //*=========== Form Submit ===========
  const onSubmit: SubmitHandler<GroupFormProps> = (data) => {
    mutate(data);
  };
  const postNewsletter = async (data: GroupFormProps) => {
    const res = await api.post('/master/majors', data);
    if (typeof res === 'undefined') {
      toast.error('Something went wrong');
      return res;
    }
  };
  const mutation = useMutation({
    mutationFn: postNewsletter,

    onSuccess: () => {
      refetch();
      toast.dismiss();
      toast.success('Added new major successfully');
      reset();
      resetField('name');
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
        <Input
          id='name'
          label='Major Name'
          validation={{ required: 'Major name must be filled' }}
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
