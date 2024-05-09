'use client';

import { useMutation } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Button from '@/_components/shared/buttons/Button';
import Input from '@/_components/shared/forms/Input';
import api from '@/_lib/axios';

type TopicAreaFormSubmit = {
  name: string;
};

export default function TopicAreaForm({
  refetch,
  setCloseModal,
}: {
  refetch?: () => void;
  setCloseModal?: Dispatch<SetStateAction<boolean>>;
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
  const postNewsletter = async (data: TopicAreaFormSubmit) => {
    const res = await api.post('/master/keywords', data);
    if (typeof res === 'undefined') {
      toast.error('Something went wrong');
      return res;
    }
  };
  const mutation = useMutation({
    mutationFn: postNewsletter,

    onSuccess: () => {
      refetch && refetch();
      setCloseModal && setCloseModal(false);
      toast.dismiss();
      toast.success('Added new faculty successfully');
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
          label='Topic area name'
          validation={{ required: 'Topic area must be filled' }}
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
