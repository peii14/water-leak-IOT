import { FacultyProps } from '@/_types/entity/faculty';
import { GroupsProps } from '@/_types/entity/groups';

export type MajorsProps = {
  id: number;
  name: string;
  faculty_id: number;
  faculty: FacultyProps;
  groups: GroupsProps[];
};
