import { KeywordProps } from '@/_types/entity/keywords';
import { ProposalsProps } from '@/_types/entity/proposals';
import { StatusProps } from '@/_types/entity/status';
import { SupervisorRecommendationProps } from '@/_types/entity/supervisor-receomendations';

export type DraftProps = {
  id: number;
  title: string;
  description: string;
  created_at: Date;
  status: StatusProps;
  supervisor_recomendationsId?: number;
  keywords: KeywordProps[];
  proposal?: ProposalsProps;
  supervisor_recomendations?: SupervisorRecommendationProps;
};
