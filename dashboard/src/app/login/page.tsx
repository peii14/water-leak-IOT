"use client";
import { useRouter } from "next/navigation";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";

import Typography from "@/_components/shared/Typography";
import LoginForm from "@/app/login/_components/LoginForm";

export default function LoginPage() {
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    if (session.status === "authenticated") router.replace("/admin/dashboard");
  }, [router, session.data?.user.role.name]);
  return (
    <main className="layout flex h-screen w-1/2 items-center">
      <section className="mx-auto md:w-1/2">
        <Typography variant="sj4" className="mb-5">
          Welcome Back!
        </Typography>
        <Typography variant="b3" className="mb-5">
          Enter your credentials to access your account
        </Typography>
        <SessionProvider>
          <LoginForm />
        </SessionProvider>
      </section>
    </main>
  );
}
