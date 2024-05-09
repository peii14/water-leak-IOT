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
import { SupervisorRecommendationProps } from '@/_types/entity/supervisor-receomendations';

type RecommendationFormProps = {
  title: string;
  description: string;
  keywords_id: number[] | string[];
};

export default function RecommendationForm({
  existingData,
}: {
  existingData?: SupervisorRecommendationProps;
}) {
  const router = useRouter();
  // #region //* =========== Form ===========
  const methods = useForm<RecommendationFormProps>({
    mode: 'onTouched',
    defaultValues: {
      title: existingData?.draft?.title ?? '',
      description: existingData?.draft?.description ?? '',
      keywords_id: existingData?.draft?.keywords.map((id) => id.id) ?? [],
    },
    values: {
      title: existingData?.draft?.title ?? '',
      description: existingData?.draft?.description ?? '',
      keywords_id:
        existingData?.draft?.keywords.map((id) => id.id.toString()) ?? [],
    },
  });
  const { handleSubmit } = methods;
  // #endregion //* =========== Form ===========
  // #region //* =========== Form Submit ===========
  const onSubmit = (data: RecommendationFormProps) => {
    mutate(data);
  };
  const postProposal = async (data: RecommendationFormProps) => {
    let res;
    existingData
      ? (res = await api.put(`/supervisor-recommendation`, {
          ...data,
          id: existingData.id,
        }))
      : (res = await api.post('/supervisor-recommendation', data));
    if (typeof res === 'undefined') {
      toast.error('Something went wrong');
      return res;
    }
  };
  const mutation = useMutation({
    mutationFn: postProposal,
    onSuccess: () => {
      toast.dismiss();
      toast.success('Added new recommendation successfully');
      router.push('/supervisor/recommendation');
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
            existingData?.draft?.keywords.map((id) => id.id.toString()) ?? []
          }
          label='Keywords'
          route='/master/keywords'
          isMulti
          validation={{ required: 'Keywords must be filled' }}
        />
        <Button type='submit' className='mt-5'>
          Submit
        </Button>
      </form>
    </FormProvider>
  );
}
