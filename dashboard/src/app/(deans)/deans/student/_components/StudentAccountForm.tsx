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
import SearchableSelectInput from '@/_components/shared/forms/SearchableSelectInput';
import ServerSelectInput from '@/_components/shared/forms/ServerSelectInput';
import api from '@/_lib/axios';
import { LoginResponse, UserProps } from '@/_types/entity/user';

type RegistrationForm = {
  name: string;
  email: string;
  role_id: number;
  username: string;
  password: string;
  program: string;
  father_name: string;
  major_id: number[];
  group_id: number[];

  faculty_id: number[];
};

export default function StudentRegistrationForm({
  existingData,
  faculty_id,
}: {
  existingData?: UserProps;
  faculty_id: number;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [defaultMajorName, setDefaultFacultyName] = useState<
    string | undefined
  >('');
  const [defaultGroupName, setDefaultMajorName] = useState<string | undefined>(
    ''
  );
  const [defaultProgram, setDefaultProgram] = useState<string | undefined>('');

  // const password = Math.random().toString(36).slice(-10);

  // #region //* =========== Form ===========
  const method = useForm<RegistrationForm>({
    mode: 'onTouched',
    defaultValues: {
      name: existingData?.name ?? '',
      email: existingData?.email ?? '',
      father_name: existingData?.father_name ?? '',
      program: existingData?.program ?? '',
      username: existingData?.username ?? '',
      group_id: existingData?.groups.map((group) => group.id) ?? [],
      major_id: existingData?.groups.map((group) => group.major_id) ?? [],
      password: '',
      faculty_id: [faculty_id],
    },
    values: {
      name: existingData?.name ?? '',
      father_name: existingData?.father_name ?? '',
      program: existingData?.program ?? '',
      group_id: existingData?.groups.map((group) => group.id) ?? [],
      major_id: existingData?.groups.map((group) => group.major_id) ?? [],
      email: existingData?.email ?? '',
      username: existingData?.username ?? '',
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
      program: data.program,
      father_name: data.father_name,
      major_id: data.major_id,
      group_id: [Number(data.group_id)],
      faculty_id: [Number(faculty_id)],

      role_id: 1,
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
      router.push('/deans/student');
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
  // #region //* =========== fetch gropos ===========
  const major_id = watch('major_id');

  // #endregion //* =========== fetch gropos ===========

  useEffect(() => {
    setDefaultFacultyName(existingData?.faculties[0]?.name);
    setDefaultMajorName(existingData?.groups[0]?.name);
    setDefaultProgram(existingData?.program);
  }, [
    defaultMajorName,
    existingData?.faculties,
    existingData?.groups,
    existingData?.program,
  ]);

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
        <Input
          id='father_name'
          label='Patronymic'
          validation={{ required: 'Patronymic must be filled' }}
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
        <SearchableSelectInput
          key={defaultProgram || 'default-program'}
          id='program'
          label='Program'
          defaultInputValue={defaultProgram}
          options={[
            { label: 'International', value: 'International' },
            { label: 'Regular', value: 'Regular' },
          ]}
        />
        <ServerSelectInput
          key={defaultMajorName || 'default-major-name'}
          id='major_id'
          label='Major'
          defaultInputValue={defaultMajorName}
          route={`/master/majors?filter_key=faculty_id&filter_operator=eq&filter_value=${faculty_id}`}
          validation={{ required: 'Faculty must be selected' }}
        />
        <ServerSelectInput
          key={defaultGroupName || 'default-group-name'}
          id='group_id'
          label='Group'
          readOnly={major_id === undefined}
          defaultInputValue={defaultGroupName}
          route={`/master/groups?filter_key=major_id&filter_operator=eq&filter_value=${major_id}`}
          validation={{ required: 'Faculty must be selected' }}
        />
        <Button type='submit' className='mx-auto' leftIcon={SendIcon}>
          Submit
        </Button>
      </form>
    </FormProvider>
  );
}
