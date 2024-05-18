"use client";
import { User2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import ButtonLink from "@/_components/shared/links/ButtonLink";
import Typography from "@/_components/shared/Typography";
import SensorsChart from "./_components/SensorsChart";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/_types/api/api.type";
import { LimitProps } from "@/_types/entity/limits";
import api from "@/_lib/axios";

export default function UnivAdminAccounts() {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (
      session.status === "unauthenticated" ||
      (session.status === "authenticated" &&
        session.data.user.role.name !== "Admin")
    )
      router.replace("/login");
  }, [router, session.data?.user.role, session.status]);
  // #region ------------------- current limit -------------------
  const { data, refetch } = useQuery<ApiResponse<LimitProps[]>>({
    queryKey: ["limits"],
    queryFn: async () => {
      const response = await api.get("/limit");
      return response.data;
    },
  });
  console.log(data);
  // #endregion ------------------- current limit -------------------
  return (
    <main className="layout">
      <section className="flex items-center justify-between">
        <aside className="flex items-center space-x-5">
          <div className="scale-150">
            <User2Icon color="#0072BC" />
          </div>
          <Typography variant="sj3" className="">
            Hi {session.data?.user.name} !
          </Typography>
        </aside>
        <div>
          <Typography variant="h1" className="mt-5">
            Current Limits
          </Typography>
          <Typography variant="b1" className="mt-1">
            {data?.data[0].limit} Liter/Second
          </Typography>
        </div>
      </section>
      <section className="mt-5 h-[80vh]">
        <SensorsChart />
      </section>
    </main>
  );
}
