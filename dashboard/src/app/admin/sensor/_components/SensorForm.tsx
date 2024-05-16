'use client';

import { useMutation } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Button from '@/_components/shared/buttons/Button';
import Input from '@/_components/shared/forms/Input';
import api from '@/_lib/axios';

type LimitFormProps = {
  limit: number;
};

export default function LimitForm() {
  // #region //* =========== Form ===========
  const methods = useForm<LimitFormProps>({
    mode: 'onTouched',
  });
  const { handleSubmit, reset } = methods;
  //#endregion  //*======== Form ===========
  //#region  //*=========== Form Submit ===========
  const onSubmit: SubmitHandler<LimitFormProps> = (data) => {
    mutate(data);
  };
  const postSensorLimit = async (data: LimitFormProps) => {
    const res = await api.post('/sensor/set-limit', data);
    if (typeof res === 'undefined') {
      toast.error('Something went wrong');
      return res;
    }
  };
  const mutation = useMutation({
    mutationFn: postSensorLimit,

    onSuccess: () => {
      toast.dismiss();
      toast.success('Set new threshold successfully');
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
        <Input
          id='name'
          label='Limit'
          style={{ width: '50%' }}
          validation={{ required: 'Limit must be filled' }}
        />
        <Button
          type='submit'
          rightIcon={Plus}
          variant='primary'
          className='mt-5'
        >
          Set Limit
        </Button>
      </form>
    </FormProvider>
  );
}
