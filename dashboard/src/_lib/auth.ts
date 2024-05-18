/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import argon2 from "argon2";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "@/_lib/prisma";
import { RoleProps } from "@/_types/entity/role";

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    role: RoleProps;
    name: string;
  }
  interface Session {
    user: User;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await prisma.users.findUnique({
          where: { username: credentials?.username },
          include: {
            role: true,
          },
        });
        if (!user || !user.role) {
          throw new Error("No user found or user has no role");
        }

        const isValid = await argon2.verify(
          user.password,
          credentials?.password ?? ""
        );
        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role as RoleProps,
        } as any;
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.user.id = token.id as string;
      session.user.role = token.role as RoleProps;
      session.user.name = token.name as string;

      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
