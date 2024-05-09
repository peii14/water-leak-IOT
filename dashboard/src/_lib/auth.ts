/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import argon2 from 'argon2';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { prisma } from '@/_lib/prisma';
import { FacultyProps } from '@/_types/entity/faculty';
import { GroupsProps } from '@/_types/entity/groups';
import { MajorsProps } from '@/_types/entity/majors';
import { RoleProps } from '@/_types/entity/role';

declare module 'next-auth' {
  interface User {
    id: string;
    username: string;
    role: RoleProps;
    name: string;
    faculty: FacultyProps[];
    majors: MajorsProps[];
    groups: GroupsProps[];
  }
  interface Session {
    user: User;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const user = await prisma.users.findUnique({
          where: { username: credentials?.username },
          include: {
            role: true,
            faculties: true,
            majors: true,
            groups: true,
          },
        });
        if (!user || !user.role) {
          throw new Error('No user found or user has no role');
        }

        const isValid = await argon2.verify(
          user.password,
          credentials?.password ?? ''
        );
        if (!isValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role as RoleProps,
          faculty: user.faculties,
          majors: user.majors,
          groups: user.groups,
        } as any;
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.user.id = token.id as string;
      session.user.role = token.role as RoleProps;
      session.user.name = token.name as string;
      session.user.majors = token.majors as MajorsProps[];
      session.user.faculty = token.faculty as FacultyProps[];
      session.user.groups = token.groups as GroupsProps[];
      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.majors = user.majors;
        token.faculty = user.faculty;
        token.groups = user.groups;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
