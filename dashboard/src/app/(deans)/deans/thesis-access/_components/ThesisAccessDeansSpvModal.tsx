'use client';

import { useMutation } from '@tanstack/react-query';
import { PlusIcon, SendIcon, Trash2Icon } from 'lucide-react';
import React from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Button from '@/_components/shared/buttons/Button';
import IconButton from '@/_components/shared/buttons/IconButton';
import ServerSelectInput from '@/_components/shared/forms/ServerSelectInput';
import Modal from '@/_components/shared/Modal';
import Typography from '@/_components/shared/Typography';
import api from '@/_lib/axios';
import { GroupsProps } from '@/_types/entity/groups';

type ModalReturnType = {
  openModal: () => void;
};

type EditGroupSupervisorProps = {
  children: (props: ModalReturnType) => JSX.Element;
  title: string;
  refetch: () => void;
  group: GroupsProps;
  faculty_session: number;
};

type GroupSupervisorForm = {
  supervisor_id: {
    id: number;
  }[];
};

export default function EditGroupsSupervisorModal({
  children,
  title,
  refetch,
  group,
  faculty_session,
}: EditGroupSupervisorProps) {
  const [open, setOpen] = React.useState(false);
  const modalReturn: ModalReturnType = {
    openModal: () => setOpen(true),
  };
  // #region //* =========== Form ===========
  const method = useForm<GroupSupervisorForm>({
    mode: 'onTouched',
    defaultValues: {
      supervisor_id: group.supervisors.map((item) => ({
        id: item.id,
      })),
    },
  });
  const { handleSubmit } = method;
  // #endregion //* ========= Form ===========
  // #region //* =========== Form Submit ===========

  const onSubmit = (data: GroupSupervisorForm) => {
    const parsedData = {
      id: group.id,
      ...data,
    };
    mutate(parsedData);
  };
  const submission = async (data: GroupSupervisorForm) => {
    try {
      const res = await api.patch('/master/groups', data);

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
  // #region //* =========== Array fields ===========
  const {
    fields: supervisorsFields,
    append: appendSupervisor,
    remove: removeSupervisor,
  } = useFieldArray({
    control: method.control,
    name: 'supervisor_id',
  });
  // #endregion //* =========== Array fields ===========

  return (
    <>
      {children(modalReturn)}
      <Modal open={open} setOpen={setOpen} title={title}>
        <Modal.Section>
          <FormProvider {...method}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Typography variant='h3'>Eligible Supervisors</Typography>
              <div className='flex flex-col gap-2'>
                {supervisorsFields.length === 0
                  ? 'No Supervisor'
                  : supervisorsFields.map((item, index) => (
                      <div key={item.id} className='flex items-center gap-2'>
                        <ServerSelectInput
                          id={`supervisor_id.${index}.id`}
                          label=''
                          defaultInputValue={
                            group.supervisors[index]?.name ?? ''
                          }
                          className='w-72'
                          route={`/master/users?filter_key=role_id&filter_operator=eq&filter_value=2&related_tables=faculties&filter_key=faculties.id&filter_operator=every&filter_value=${faculty_session}`}
                        />
                        <IconButton
                          type='button'
                          variant='danger'
                          className='h-max'
                          onClick={() => removeSupervisor(index)}
                          icon={Trash2Icon}
                        />
                      </div>
                    ))}
              </div>
              <div className='mt-3 flex flex-col gap-3'>
                <Button
                  variant='outline'
                  type='button'
                  leftIcon={PlusIcon}
                  onClick={() => appendSupervisor({ id: 0 })}
                  className='w-max'
                >
                  Add Supervisor
                </Button>
                <Button type='submit' leftIcon={SendIcon} className='w-max'>
                  Submit
                </Button>
              </div>
            </form>
          </FormProvider>
        </Modal.Section>
      </Modal>
    </>
  );
}
