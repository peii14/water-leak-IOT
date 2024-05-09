import { ChevronRight } from 'lucide-react';

import UnstyledLink from '@/_components/shared/links/UnstyledLink';
import Typography from '@/_components/shared/Typography';

export default function RecommendationList() {
  return (
    <section className='mt-5 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl'>
      <aside className='hover:bg-primary-500 group  duration-200'>
        <UnstyledLink
          className='flex items-center justify-between p-5'
          href='/student/recommendation/available'
        >
          <div>
            <Typography className='group-hover:text-white' variant='b1'>
              Recommendation List
            </Typography>
            <Typography
              className='mt-1 group-hover:text-white'
              variant='b2'
              color='secondary'
            >
              View recommendation list from supervisor
            </Typography>
          </div>
          <ChevronRight className='bg-primary-500 group-hover:text-primary-500 h-10 w-10 rounded-full pl-1 text-white group-hover:bg-white' />
        </UnstyledLink>
      </aside>
      <hr className='mx-auto ' />
      <aside className='hover:bg-primary-500 group  duration-200'>
        <UnstyledLink
          className='flex items-center justify-between p-5'
          href='/student/recommendation/taken'
        >
          <div className=''>
            <Typography className=' group-hover:text-white' variant='b1'>
              Taken Recomendation
            </Typography>
            <Typography
              className='mt-1 group-hover:text-white'
              variant='b2'
              color='secondary'
            >
              View your recommendation that you took.
            </Typography>
          </div>
          <ChevronRight className='bg-primary-500 group-hover:text-primary-500 h-10 w-10 rounded-full pl-1 text-white group-hover:bg-white' />
        </UnstyledLink>
      </aside>
    </section>
  );
}
