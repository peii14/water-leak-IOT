import { User } from "./user";

export type LimitProps = {
  id: number;
  limit: number;
  created_at: Date;
  updated_at: Date;
  user: User;
};
