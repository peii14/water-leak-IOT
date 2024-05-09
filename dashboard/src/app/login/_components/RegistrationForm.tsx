'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SendIcon } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import Button from '@/_components/shared/buttons/Button';
import Input from '@/_components/shared/forms/Input';
import PasswordInput from '@/_components/shared/forms/PasswordInput';
import Radio from '@/_components/shared/forms/Radio';
import api from '@/_lib/axios';
import logger from '@/_lib/logger';
import { ApiResponse } from '@/_types/api/api.type';
import { RoleProps } from '@/_types/entity/role';
import { LoginResponse } from '@/_types/entity/user';

type RegistrationForm = {
  name: string;
  email: string;
  role_id: number;
  username: string;
  password: string;

  group_id: number;
};

export default function RegistrationForm() {
  const queryClient = useQueryClient();
  // #region //* =========== Form ===========
  const method = useForm<RegistrationForm>({
    mode: 'onTouched',
  });
  const { handleSubmit, watch } = method;
  // #endregion //* ========= Form ===========
  // #region //* =========== Form Submit ===========

  const onSubmit = (data: RegistrationForm) => {
    mutate(data);
  };
  const loginUser = async (data: RegistrationForm): Promise<LoginResponse> => {
    try {
      const res = await api.post('/master/users', data);

      if (!res || typeof res === 'undefined') {
        toast.error('Unknown error occurred.');
        return Promise.reject(new Error('Unknown error.'));
      }

      return res as unknown as LoginResponse;
    } catch (e) {
      toast.error('Error during login.');
      return Promise.reject(new Error('Error parsing response.'));
    }
  };

  const mutation = useMutation<LoginResponse, Error, RegistrationForm>({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries();
      toast.success('Logged in successfully');
    },
    onError: (error: Error) => {
      toast.dismiss();
      toast.error(error.message);
    },
    onMutate: () => {
      toast.loading('Signing in...');
    },
  });
  const { mutate } = mutation;
  // #endregion //* =========== Form Submit ===========
  // #region //* =========== Roles ===========
  const { data: roles } = useQuery<ApiResponse<RoleProps[]>>({
    queryKey: ['/master/role'],
    queryFn: async () => await api.get('/master/role').then((res) => res.data),
  });
  logger(roles?.data);
  // #endregion //* =========== Roles ===========
  return (
    <FormProvider {...method}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
        <div className='flex space-x-3'>
          {roles?.data?.map((role) => (
            <>
              <Radio
                id='role_id'
                name='role_id'
                value={role.id.toString()}
                label={role.name}
                validation={{ required: 'Role must be selected' }}
              />
            </>
          ))}
        </div>
        <Input
          id='username'
          label='Username'
          validation={{ required: 'Username must be filled' }}
        />
        <PasswordInput
          id='password'
          label='Password'
          validation={{ required: 'Password must be filled' }}
        />
        <PasswordInput
          id='confirmPassword'
          label='Confirm Password'
          validation={{
            required: 'Confirm Password must be filled',
            validate: (value) =>
              value === watch('password') || 'Passwords do not match',
          }}
        />
        <Input
          id='email'
          label='Email'
          validation={{ required: 'Email must be filled' }}
        />
        <Button type='submit' className='mx-auto' leftIcon={SendIcon}>
          Submit
        </Button>
      </form>
    </FormProvider>
  );
}
