'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SendIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import Button from '@/_components/shared/buttons/Button';
import Input from '@/_components/shared/forms/Input';
import PasswordInput from '@/_components/shared/forms/PasswordInput';
import ServerSelectInput from '@/_components/shared/forms/ServerSelectInput';
import api from '@/_lib/axios';
import { LoginResponse, UserProps } from '@/_types/entity/user';

type RegistrationForm = {
  name: string;
  email: string;
  role_id: number;
  username: string;
  password: string;

  keywords_id: number[] | string[];
  faculty_id: number[];
};

export default function SupervisorRegistrationForm({
  existingData,
  faculty_id,
}: {
  existingData?: UserProps;
  faculty_id: number;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();

  // #region //* =========== Form ===========
  const method = useForm<RegistrationForm>({
    mode: 'onTouched',
    defaultValues: {
      name: existingData?.name ?? '',
      email: existingData?.email ?? '',
      username: existingData?.username ?? '',
      password: '',
      keywords_id:
        existingData?.keywords.map((keyword) => keyword.id.toString()) ?? [],
      faculty_id: [faculty_id],
    },
    values: {
      name: existingData?.name ?? '',
      email: existingData?.email ?? '',
      username: existingData?.username ?? '',
      keywords_id:
        existingData?.keywords.map((keyword) => keyword.id.toString()) ?? [],
      password: '',
      role_id: 3,
      faculty_id: [faculty_id],
    },
  });

  const { handleSubmit, watch } = method;

  // #endregion //* ========= Form ===========
  // #region //* =========== Form Submit ===========

  const onSubmit = (data: RegistrationForm) => {
    const mutateData: RegistrationForm = {
      name: data.name,
      email: data.email,
      username: data.username,
      password: data.password,
      faculty_id: [Number(faculty_id)],
      keywords_id: data.keywords_id,
      role_id: 2,
    };
    mutate(mutateData);
  };
  const onMutate = async (data: RegistrationForm): Promise<LoginResponse> => {
    try {
      let res;
      if (existingData) {
        res = await api.put(`/master/users/`, { ...data, id: existingData.id });
      } else {
        res = await api.post('/master/users', data);
      }

      if (!res || typeof res === 'undefined') {
        toast.error('Unknown error occurred.');
        return Promise.reject(new Error('Unknown error.'));
      }

      return res as unknown as LoginResponse;
    } catch (e) {
      toast.error('Error.');
      return Promise.reject(new Error('Error parsing response.'));
    }
  };

  const mutation = useMutation<LoginResponse, Error, RegistrationForm>({
    mutationFn: onMutate,
    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries();
      toast.success('Account created successfully.');
      router.push('/deans/supervisors');
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
    <FormProvider {...method}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
        <Input
          id='name'
          label='Name'
          validation={{ required: 'Name must be filled' }}
        />
        <Input
          id='email'
          label='Email'
          validation={{ required: 'Email must be filled' }}
        />
        <Input
          id='username'
          label='Username'
          validation={{ required: 'Username must be filled' }}
        />

        <PasswordInput
          id='password'
          label='Password'
          // defaultValue={password}
          validation={{ required: 'Password must be filled' }}
        />
        <PasswordInput
          id='confirmPassword'
          label='Confirm Password'
          // defaultValue={password}
          validation={{
            required: 'Confirm Password must be filled',
            validate: (value) =>
              value === watch('password') || 'Passwords do not match',
          }}
        />
        <ServerSelectInput
          id='keywords_id'
          label='Topic Area'
          route={`/master/keywords?filter_key=faculty_id&filter_operator=eq&filter_value=${faculty_id}`}
          isMulti
          defaultValue={
            existingData?.keywords.map((keyword) => keyword.id.toString()) ?? []
          }
        />

        <Button type='submit' className='mx-auto' leftIcon={SendIcon}>
          Submit
        </Button>
      </form>
    </FormProvider>
  );
}
