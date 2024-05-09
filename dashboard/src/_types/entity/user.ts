import { FacultyProps } from '@/_types/entity/faculty';
import { GroupsProps } from '@/_types/entity/groups';
import { KeywordProps } from '@/_types/entity/keywords';
import { ProposalsProps } from '@/_types/entity/proposals';
import { RoleProps } from '@/_types/entity/role';

export type User = {
  id: number;
  username: string;
  role: RoleProps[];
  name: string;
  token: string;
  faculties: FacultyProps[];
  groups: GroupsProps[];
  father_name: string;
  program: string;
};

export type LoginResponse = {
  user: User;
  token: string;
};
export type LoginError = {
  message: string;
};

export type UserProps = {
  id: number;
  username: string;
  name: string;
  email: string;
  role: RoleProps[];
  faculties: FacultyProps[];
  father_name?: string;
  program?: string;
  groups: GroupsProps[];

  keywords: KeywordProps[];
  studentProposals: ProposalsProps;
};
