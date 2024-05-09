import { DraftProps } from '@/_types/entity/draft';
import { GroupsProps } from '@/_types/entity/groups';
import { ProposalsProps } from '@/_types/entity/proposals';
import { UserProps } from '@/_types/entity/user';

export type SupervisorRecommendationProps = {
  id: number;
  supervisor_id: number;
  createdAt: Date;
  draft_id?: number;
  supervisor: UserProps;
  proposals: ProposalsProps[];
  draft?: DraftProps;
  groups: GroupsProps[];
  students: UserProps[];
};
