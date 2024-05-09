'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Button from '@/_components/shared/buttons/Button';
import Input from '@/_components/shared/forms/Input';
import ServerSelectInput from '@/_components/shared/forms/ServerSelectInput';
import TextArea from '@/_components/shared/forms/TextArea';
import api from '@/_lib/axios';
import { ProposalsProps } from '@/_types/entity/proposals';

type ProposalFormProps = {
  title: string;
  description: string;
  keywords_id: number[] | string[];
  supervisor_id: number[] | string;
};

export default function ProposalForm({
  existingData,
}: {
  existingData?: ProposalsProps;
}) {
  const router = useRouter();
  // #region //* =========== Form ===========
  const methods = useForm<ProposalFormProps>({
    mode: 'onTouched',
    defaultValues: {
      title: existingData?.draft.title ?? '',
      description: existingData?.draft.description ?? '',
      keywords_id:
        existingData?.draft.keywords.map((id) => id.id.toString()) ?? [],
      supervisor_id: existingData?.supervisor_id.toString() ?? '',
    },
    values: {
      title: existingData?.draft.title ?? '',
      description: existingData?.draft.description ?? '',
      keywords_id:
        existingData?.draft.keywords.map((id) => id.id.toString()) ?? [],
      supervisor_id: existingData?.supervisor_id.toString() ?? '',
    },
  });
  const { handleSubmit } = methods;
  // #endregion //* =========== Form ===========
  // #region //* =========== Form Submit ===========
  const onSubmit = (data: ProposalFormProps) => {
    mutate(data);
  };
  const postProposal = async (data: ProposalFormProps) => {
    let res;

    existingData
      ? (res = await api.put(`/proposal`, { ...data, id: existingData.id }))
      : (res = await api.post('/proposal', data));
    if (typeof res === 'undefined') {
      toast.error('Something went wrong');
      return res;
    }
  };
  const mutation = useMutation({
    mutationFn: postProposal,

    onSuccess: () => {
      toast.dismiss();
      toast.success('Added proposal area successfully');
      router.push('/student/proposal');
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
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        <Input
          id='title'
          label='Title'
          validation={{ required: 'Title must be filled' }}
        />
        <TextArea
          id='description'
          label='Description'
          validation={{ required: 'Description must be filled' }}
        />
        <ServerSelectInput
          id='keywords_id'
          defaultValue={
            existingData?.draft.keywords.map((id) => id.id.toString()) ?? []
          }
          label='Keywords'
          route='/master/keywords'
          isMulti
          validation={{ required: 'Keywords must be filled' }}
        />
        <ServerSelectInput
          id='supervisor_id'
          defaultValue={existingData?.supervisor_id.toString() ?? ''}
          defaultInputValue={existingData?.supervisor.name ?? ''}
          label='Supervisor'
          route='/master/users?filter_key=role_id&filter_operator=eq&filter_value=2'
          validation={{ required: 'Supervisor must be filled' }}
        />
        <Button type='submit' className='mt-5'>
          Submit
        </Button>
      </form>
    </FormProvider>
  );
}
