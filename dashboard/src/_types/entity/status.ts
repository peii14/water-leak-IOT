import { ProposalsProps } from '@/_types/entity/proposals';

export type StatusProps = {
  id: number;
  name: string;
  type: number;
  proposals: ProposalsProps[];
};
