'use client';

import { useMutation } from '@tanstack/react-query';
import { SendIcon } from 'lucide-react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Button from '@/_components/shared/buttons/Button';
import Input from '@/_components/shared/forms/Input';
import Modal from '@/_components/shared/Modal';
import Typography from '@/_components/shared/Typography';
import api from '@/_lib/axios';
import { MajorsProps } from '@/_types/entity/majors';

type ModalReturnType = {
  openModal: () => void;
};

type EditGroupModalProps = {
  children: (props: ModalReturnType) => JSX.Element;
  title: string;
  refetch: () => void;
  majorProps: MajorsProps;
};

type FacultyForm = {
  id: number;
  name: string;
};

export default function EditMajorModal({
  children,
  title,
  refetch,
  majorProps,
}: EditGroupModalProps) {
  const [open, setOpen] = React.useState(false);
  const modalReturn: ModalReturnType = {
    openModal: () => setOpen(true),
  };
  // #region //* =========== Form ===========
  const method = useForm<FacultyForm>({
    mode: 'onTouched',
    defaultValues: {
      name: majorProps.name,
    },
  });
  const { handleSubmit } = method;
  // #endregion //* ========= Form ===========
  // #region //* =========== Form Submit ===========

  const onSubmit = (data: FacultyForm) => {
    const mutateData: FacultyForm = {
      ...data,
      id: Number(majorProps.id),
    };
    mutate(mutateData);
  };
  const submission = async (data: FacultyForm) => {
    try {
      const res = await api.put('/master/majors', data);

      if (!res || typeof res === 'undefined') {
        toast.error('Unknown error occurred.');
        return Promise.reject(new Error('Unknown error.'));
      }

      return res;
    } catch (e) {
      toast.error('Something went wrong.');
      return Promise.reject(new Error('Error parsing response.'));
    }
  };

  const mutation = useMutation({
    mutationFn: submission,
    onSuccess: () => {
      toast.dismiss();
      refetch();
      toast.success('Edit group success.');
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
                label='New group name'
                validation={{ required: 'New group name must be filled' }}
              />
              <Typography variant='b2' className='mt-3'>
                Select faculty:
              </Typography>

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
