'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SendIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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

  faculty_id: number[];
};

export default function DeansRegistrationForm({
  existingData,
}: {
  existingData?: UserProps;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [defaultFacultyName, setDefaultFacultyName] = useState<
    string | undefined
  >('');

  // const password = Math.random().toString(36).slice(-10);

  // #region //* =========== Form ===========
  const method = useForm<RegistrationForm>({
    mode: 'onTouched',
    defaultValues: {
      name: existingData?.name ?? '',
      email: existingData?.email ?? '',
      username: existingData?.username ?? '',
      password: '',
      faculty_id: [0],
    },
    values: {
      name: existingData?.name ?? '',
      email: existingData?.email ?? '',
      username: existingData?.username ?? '',
      password: '',
      role_id: 3,
      faculty_id: [0],
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
      faculty_id: [Number(data.faculty_id)],

      role_id: 3,
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
      router.push('/admin/account');
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
  useEffect(() => {
    setDefaultFacultyName(existingData?.faculties[0]?.name);
  }, [defaultFacultyName, existingData?.faculties]);

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
          key={defaultFacultyName || 'default-faculty-name'}
          id='faculty_id'
          label='Faculty'
          defaultInputValue={defaultFacultyName}
          route='/master/faculty'
          validation={{ required: 'Faculty must be selected' }}
        />
        <Button type='submit' className='mx-auto' leftIcon={SendIcon}>
          Submit
        </Button>
      </form>
    </FormProvider>
  );
}
