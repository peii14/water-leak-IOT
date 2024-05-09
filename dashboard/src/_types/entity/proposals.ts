import { DraftProps } from '@/_types/entity/draft';
import { GroupsProps } from '@/_types/entity/groups';
import { SupervisorRecommendationProps } from '@/_types/entity/supervisor-receomendations';
import { UserProps } from '@/_types/entity/user';

export type ProposalsProps = {
  id: number;
  status_id: number;
  created_at: string;
  group_id: number;
  student_id: number;
  supervisor_id: number;
  draft_id: number;
  supervisor_recomendations_id?: number;
  student: UserProps;
  supervisor: UserProps;
  group: GroupsProps;
  draft: DraftProps;
  supervisor_recomendations?: SupervisorRecommendationProps;
};
