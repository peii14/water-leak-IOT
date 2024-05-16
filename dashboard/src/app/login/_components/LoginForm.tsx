"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import Button from "@/_components/shared/buttons/Button";
import Input from "@/_components/shared/forms/Input";
import PasswordInput from "@/_components/shared/forms/PasswordInput";
import { LoginResponse } from "@/_types/entity/user";

type LoginForm = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  // #region //* =========== Form ===========
  const method = useForm<LoginForm>({
    mode: "onTouched",
  });
  const { handleSubmit } = method;
  // #endregion //* ========= Form ===========
  // #region //* =========== Form Submit ===========

  const onSubmit = (data: LoginForm) => {
    mutate(data);
  };
  const loginUser = async (data: LoginForm): Promise<LoginResponse> => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: data.username,
        password: data.password,
      });

      if (!res || typeof res === "undefined") {
        toast.error("Unknown error occurred.");
        return Promise.reject(new Error("Unknown error."));
      }
      if (res.error) {
        toast.error(res.error);
        return Promise.reject(new Error(res.error));
      }
      return res as unknown as LoginResponse;
    } catch (e) {
      toast.error("Error during login.");
      return Promise.reject(new Error("Error parsing response."));
    }
  };

  const mutation = useMutation<LoginResponse, Error, LoginForm>({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries();
      toast.success("Logged in successfully");
      router.push("/admin/dashboard");
    },
    onError: (error: Error) => {
      toast.dismiss();
      toast.error(error.message);
    },
    onMutate: () => {
      toast.loading("Signing in...");
    },
  });
  const { mutate } = mutation;
  const session = useSession();

  return (
    <FormProvider {...method}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input
          id="username"
          label="Username"
          validation={{ required: "Username must be filled" }}
        />
        <PasswordInput
          id="password"
          label="Password"
          validation={{ required: "Password must be filled" }}
        />
        <Button type="submit" className="mx-auto w-full ">
          Sign In
        </Button>
      </form>
    </FormProvider>
  );
}
