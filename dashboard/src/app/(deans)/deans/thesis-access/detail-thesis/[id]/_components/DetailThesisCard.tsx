import UnderlineLink from '@/_components/shared/links/UnderlineLink';
import Skeleton from '@/_components/shared/Skeleton';
import Keywords from '@/_components/shared/tags/Keywords';
import StatusTags from '@/_components/shared/tags/Status';
import Typography from '@/_components/shared/Typography';
import { ProposalsProps } from '@/_types/entity/proposals';
import { SupervisorRecommendationProps } from '@/_types/entity/supervisor-receomendations';

export default function DetailThesisCard({
  proposal,
  isLoading,
}: {
  proposal?: ProposalsProps | SupervisorRecommendationProps;
  isLoading: boolean;
}) {
  return (
    <section className='mt-5 min-h-[50vh] rounded-xl border border-gray-100 bg-white p-5 shadow-xl'>
      <aside className='flex items-center justify-between'>
        {isLoading ? (
          <Skeleton className='h-10 w-1/2' />
        ) : (
          <Typography variant='h1'>{proposal?.draft?.title}</Typography>
        )}
        <div className='w-36'>
          {isLoading ? (
            <Skeleton className='h-10 w-1/4' />
          ) : (
            <StatusTags
              status={proposal?.draft?.status.name ?? ''}
              variant={
                proposal?.draft?.status.name === 'Approve' ||
                proposal?.draft?.status.name === 'Available'
                  ? 'success'
                  : proposal?.draft?.status.name === 'Rejected' ||
                    proposal?.draft?.status.name === 'Taken'
                  ? 'neutral'
                  : proposal?.draft?.status.name === 'Proposed'
                  ? 'warning'
                  : 'danger'
              }
            />
          )}
        </div>
      </aside>
      <hr className='my-5' />
      <Typography variant='b1'>Description</Typography>
      {isLoading ? (
        <>
          <Skeleton className='h-5 w-1/2' />
          <Skeleton className='mt-2 h-5 w-1/3' />
        </>
      ) : (
        <Typography variant='b2' color='secondary'>
          {proposal?.draft?.description}
        </Typography>
      )}
      <Typography variant='b1' className='mt-5'>
        Topic Area
      </Typography>
      {isLoading ? (
        <Skeleton className='h-5 w-1/2' />
      ) : (
        <ul className='mt-3 grid w-2/3 grid-cols-5 items-center gap-3'>
          {proposal?.draft?.keywords.map((keyword) => (
            <Keywords key={keyword.id} keywords={keyword.name} />
          ))}
        </ul>
      )}
      {(proposal as ProposalsProps).student && (
        <>
          <Typography variant='b1' className='mt-5'>
            Student Name
          </Typography>
          {isLoading ? (
            <Skeleton className='h-5 w-1/2' />
          ) : (
            <UnderlineLink
              target='_blank'
              href={`mailto:${(proposal as ProposalsProps).student.email}`}
            >
              <Typography variant='b2' color='secondary' className=''>
                {(proposal as ProposalsProps).student.name}
              </Typography>
            </UnderlineLink>
          )}
          <Typography variant='b1' className='mt-5'>
            Supervisors
          </Typography>
          {isLoading ? (
            <Skeleton className='h-5 w-1/2' />
          ) : (
            <UnderlineLink
              target='_blank'
              href={`mailto:${proposal?.supervisor.email}`}
            >
              <Typography variant='b2' color='secondary' className=''>
                {proposal?.supervisor.name}
              </Typography>
            </UnderlineLink>
          )}
        </>
      )}
    </section>
  );
}
