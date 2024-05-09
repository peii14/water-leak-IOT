import { FacultyProps } from '@/_types/entity/faculty';
import { MajorsProps } from '@/_types/entity/majors';
import { UserProps } from '@/_types/entity/user';

export type GroupsProps = {
  id: number;
  name: string;
  created_at: Date;
  major_id: number;
  majors: MajorsProps;
  faculty_id: number;
  faculty: FacultyProps;
  group_status: boolean;

  students: UserProps[];
  supervisors: UserProps[];
};
