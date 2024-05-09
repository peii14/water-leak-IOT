import { MajorsProps } from '@/_types/entity/majors';

export type FacultyProps = {
  id: number;
  name: string;
  created_at: Date;
  majors: MajorsProps[];
};
