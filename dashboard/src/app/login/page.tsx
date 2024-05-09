'use client';
import { useRouter } from 'next/navigation';
import { SessionProvider, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import Typography from '@/_components/shared/Typography';
import LoginForm from '@/app/login/_components/LoginForm';

export default function LoginPage() {
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    if (session.data?.user.role.name === 'Student') {
      router.push('/student/dashboard');
    } else if (session.data?.user.role.name === 'Supervisor') {
      router.push('/supervisor/dashboard');
    } else if (session.data?.user.role.name === 'Deans') {
      router.push('/deans/dashboard');
    } else if (session.data?.user.role.name === 'Admin') {
      router.push('/admin/account');
    }
  }, [router, session.data?.user.role.name]);
  return (
    <main className='layout flex h-screen w-1/2 items-center'>
      <section className='mx-auto md:w-1/2'>
        <Typography variant='sj4' className='mb-5'>
          Welcome Back!
        </Typography>
        <Typography variant='b3' className='mb-5'>
          Enter your credentials to access your account
        </Typography>
        <SessionProvider>
          <LoginForm />
        </SessionProvider>
      </section>
    </main>
  );
}
