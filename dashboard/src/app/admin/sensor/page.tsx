"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import Typography from "@/_components/shared/Typography";
import FacultyIcon from "@/_icons/Faculty";
import LimitForm from "./_components/SensorForm";
import { useQuery } from "@tanstack/react-query";
import api from "@/_lib/axios";
import { ApiResponse } from "@/_types/api/api.type";
import { LimitProps } from "@/_types/entity/limits";

export default function FacultyAdminPage() {
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
      <section className="flex items-center space-x-5">
        <div className="scale-150">
          <FacultyIcon />
        </div>
        <Typography variant="sj3" className="">
          Sensors
        </Typography>
      </section>
      <section>
        <Typography variant="h1" className="mt-5">
          Current Limits
        </Typography>
        <Typography variant="h3" className="mt-2">
          {data?.data[0].limit}
        </Typography>
      </section>
      <section className="mt-5">
        <LimitForm refetch={refetch} />
      </section>
    </main>
  );
}
