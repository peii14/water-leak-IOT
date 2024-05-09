'use client';

import { useMutation } from '@tanstack/react-query';
import { SendIcon } from 'lucide-react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Button from '@/_components/shared/buttons/Button';
import Input from '@/_components/shared/forms/Input';
import Modal from '@/_components/shared/Modal';
import api from '@/_lib/axios';

type ModalReturnType = {
  openModal: () => void;
};

type EditTopicAreaModalprops = {
  children: (props: ModalReturnType) => JSX.Element;
  title: string;
  id: number;
  name: string;
  refetch: () => void;
};

type TopicAreaForm = {
  id: number;
  name: string;
};

export default function EditTopicAreaModal({
  children,
  title,
  id,
  name,
  refetch,
}: EditTopicAreaModalprops) {
  const [open, setOpen] = React.useState(false);
  const modalReturn: ModalReturnType = {
    openModal: () => setOpen(true),
  };
  // #region //* =========== Form ===========
  const method = useForm<TopicAreaForm>({
    mode: 'onTouched',
    defaultValues: {
      name: name ?? '',
    },
  });
  const { handleSubmit } = method;
  // #endregion //* ========= Form ===========
  // #region //* =========== Form Submit ===========

  const onSubmit = (data: TopicAreaForm) => {
    const mutateData: TopicAreaForm = {
      ...data,
      id: id,
    };
    mutate(mutateData);
  };
  const submission = async (data: TopicAreaForm) => {
    try {
      const res = await api.put('/master/keywords', data);

      if (!res || typeof res === 'undefined') {
        toast.error('Unknown error occurred.');
        return Promise.reject(new Error('Unknown error.'));
      }

      return res;
    } catch (e) {
      toast.error('Error during login.');
      return Promise.reject(new Error('Error parsing response.'));
    }
  };

  const mutation = useMutation({
    mutationFn: submission,
    onSuccess: () => {
      toast.dismiss();
      refetch();
      toast.success('Edit topic area success.');
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
  // #endregion //* =========== Form Submit ===========

  return (
    <>
      {children(modalReturn)}
      <Modal open={open} setOpen={setOpen} title={title}>
        <Modal.Section>
          <FormProvider {...method}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                id='name'
                label='New topic area name'
                validation={{ required: 'New topic area must be filled' }}
              />
              <Button type='submit' leftIcon={SendIcon} className='mt-3'>
                Submit
              </Button>
            </form>
          </FormProvider>
        </Modal.Section>
      </Modal>
    </>
  );
}
