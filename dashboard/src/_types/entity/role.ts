import { announcement_roles } from '@/_types/entity/announcement';
import { User } from '@/_types/entity/user';

export type RoleProps = {
  id: number;
  name: string;
  created_at: Date;
  users?: User[];
  announcement_roles: announcement_roles[];
};
