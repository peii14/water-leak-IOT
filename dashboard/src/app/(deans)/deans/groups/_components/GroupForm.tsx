'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Button from '@/_components/shared/buttons/Button';
import Input from '@/_components/shared/forms/Input';
import Radio from '@/_components/shared/forms/Radio';
import Typography from '@/_components/shared/Typography';
import api from '@/_lib/axios';
import { buildURL } from '@/_lib/table';
import { ApiResponse } from '@/_types/api/api.type';
import { FacultyProps } from '@/_types/entity/faculty';

type GroupFormProps = {
  name: string;
  major_id: number;
};

export default function GroupAdminForm({
  refetch,
  faculty_id,
}: {
  refetch: () => void;
  faculty_id: number;
}) {
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
    const res = await api.post('/master/groups', data);
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
      toast.success('Added new group successfully');
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
  // #region //* =========== Majors ===========
  const majorsUrl = buildURL({
    baseUrl: '/master/majors',
    // additionalParam: {
    //   filter_key: 'faculty_id',
    //   filter_operator: 'eq',
    //   filter_value: faculty_id,
    // },
  });
  const { data: majors } = useQuery<ApiResponse<FacultyProps[]>>({
    queryKey: [majorsUrl],
    enabled: !!faculty_id,
    queryFn: async () => await api.get(majorsUrl).then((res) => res.data),
  });
  // #endregion //* ========= Majors ===========
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id='name'
          label='Group Name'
          validation={{ required: 'group must be filled' }}
        />
        {majors && majors?.data.length > 0 && (
          <Typography variant='b2' className='mt-3'>
            Select the major that this group belongs to:
          </Typography>
        )}
        {majors?.data.map((major) => (
          <div key={major.id}>
            <ul className='mt-2 grid w-max grid-cols-3 gap-x-5'>
              <Radio
                name='major_id'
                label={major.name}
                value={major.id.toString()}
              />
            </ul>
          </div>
        ))}
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
