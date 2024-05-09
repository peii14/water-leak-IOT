'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import ArrowLink from '@/_components/shared/links/ArrowLink';
import Typography from '@/_components/shared/Typography';
import api from '@/_lib/axios';
import { buildURL } from '@/_lib/table';
import { ApiResponse } from '@/_types/api/api.type';
import { UserProps } from '@/_types/entity/user';
import SupervisorRegistrationForm from '@/app/(deans)/deans/supervisors/_components/SupervisorAccountForm';

export default function RegisterStudentPage() {
  const session = useSession();
  const router = useRouter();
  const id = usePathname().split('/').pop();
  useEffect(() => {
    if (
      session.status === 'unauthenticated' ||
      (session.status === 'authenticated' &&
        session.data.user.role.name !== 'Deans')
    )
      router.replace('/login');
  }, [router, session.data?.user.role.name, session.status, id]);
  // #region //* =========== Form Mode ===========
  const url = buildURL({
    baseUrl: '/master/users',
    additionalParam: {
      filter_value: id,
      filter_operator: 'eq',
      filter_key: 'id',
      related_tables: ['keywords'],
    },
  });
  const { data: existingData, isLoading } = useQuery<ApiResponse<UserProps[]>>({
    queryKey: [url],
    enabled: !isNaN(parseInt(id as string)),
    queryFn: async () => {
      const res = await api.get(url);
      return res.data;
    },
  });

  // #endregion //* =========== Form Mode ===========
  // #region ==================== Edit logic ====================
  useEffect(() => {
    const isExist = existingData?.data[0].id?.toString() === id;

    if (id !== 'register' && !isExist && !isLoading) {
      router.replace('/404');
    }
  }, [existingData, isLoading, id, router]);
  // #endregion ================= Edit logic =================
  return (
    <main className='layout'>
      <section className=''>
        <ArrowLink href='/deans/supervisors' direction='left'>
          Back
        </ArrowLink>
        <Typography variant='sj4' className='my-5'>
          Add/Edit Supervisor Account
        </Typography>
      </section>
      <section className='md:w-2/3'>
        <SupervisorRegistrationForm
          existingData={existingData?.data[0]}
          faculty_id={session.data?.user.faculty[0].id ?? 0}
        />
      </section>
    </main>
  );
}
