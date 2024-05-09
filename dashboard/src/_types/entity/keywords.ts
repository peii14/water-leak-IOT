import { UserProps } from '@/_types/entity/user';

export type KeywordProps = {
  id: number;
  name: string;
  users: UserProps[];
};
