'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import Typography from '@/_components/shared/Typography';
import LightbulbIcon from '@/_icons/Lightbulb';

// Array variable to store water conservation tips
const conservationTips = [
  {
    title: 'Understanding Your Water Usage Patterns',
    content: 'Before implementing personalized conservation tips, it\'s essential to understand how water is used in your household. Track your water usage over a week or month, noting areas of high consumption. This could include activities such as showering, watering the garden, doing laundry, washing dishes, and flushing toilets.'
  },
  {
    title: 'Efficient Water Use in the Bathroom',
    content: 'The bathroom is one of the primary areas where water is commonly wasted. Personalized conservation tips for the bathroom might include: installing low-flow showerheads and faucets, taking shorter showers, fixing leaks promptly, and using a toilet displacement device.'
  },
  {
    title: 'Optimizing Laundry Practices',
    content: 'Laundry can account for a significant portion of household water usage. Personalized conservation tips for laundry might include: waiting until you have a full load before running the washing machine, choosing a washing machine with adjustable water levels, using cold water whenever possible, and reusing towels and clothing items.'
  },
  {
    title: 'Water-Saving Tips in the Kitchen',
    content: 'The kitchen is another area where water is frequently wasted. Personalized conservation tips for the kitchen might include: washing fruits and vegetables in a basin, soaking pots and pans instead of letting the water run, using a dishwasher with a high energy star rating, and collecting water used for rinsing fruits and vegetables.'
  },
  {
    title: 'Outdoor Water Conservation',
    content: 'Outdoor water usage, particularly for gardening and landscaping, can contribute significantly to overall water consumption. Personalized conservation tips for outdoor water use might include: watering plants and lawns early in the morning or late in the evening, installing a rainwater harvesting system, using mulch in garden beds, and choosing drought-resistant plants.'
  },
  {
    title: 'Monitoring and Adjusting Usage',
    content: 'Once you\'ve implemented personalized conservation tips, it\'s essential to monitor your water usage regularly and make adjustments as needed. Keep track of your water bills to see if there are any noticeable reductions in consumption.'
  },
  {
    title: 'Educating Household Members',
    content: 'Water conservation is a collective effort that requires the participation of all household members. Take the time to educate your family or roommates about the importance of water conservation and involve them in implementing personalized conservation tips.'
  },
  {
    title: 'Seeking Professional Advice',
    content: 'If you\'re unsure about how to best conserve water in your household or if you\'re facing specific challenges, don\'t hesitate to seek professional advice. Local water conservation organizations, environmental agencies, or plumbing professionals can provide personalized recommendations based on your unique circumstances.'
  },
  {
    title: 'Celebrating Progress',
    content: 'Finally, celebrate your achievements and progress in water conservation. Recognize the positive impact that your efforts are having on the environment and the community. Share your success stories with others to inspire further action and contribute to a culture of sustainability.'
  }
];

export default function FacultyAdminPage() {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (
      session.status === 'unauthenticated' ||
      (session.status === 'authenticated' &&
        session.data.user.role.name !== 'Admin')
    )
      router.replace('/login');
  }, [router, session.data?.user.role, session.status]);

  return (
    <main className='layout'>
      <section className='flex items-center space-x-5 py-8'>
        <div className='scale-150'>
          <LightbulbIcon />
        </div>
        <Typography variant='h2' className='text-primary'>
          Personalized Water Conservation Tips
        </Typography>
      </section>
      <section className='py-8'>
        <div className='container mx-auto'>
          <Typography variant='b1' className='mb-8 text-gray-600'>
            These personalized conservation tips tailored to your household's specific usage patterns can be even more effective. By understanding how water is used in your home and making targeted changes, you can significantly reduce your water consumption and contribute to water conservation efforts.
          </Typography>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {conservationTips.map((tip, index) => (
              <div key={index} className='bg-white shadow-md rounded-lg p-6'>
                <Typography variant='h3' className='mb-4 text-primary'>{tip.title}</Typography>
                <Typography variant='b2' className='text-gray-700'>{tip.content}</Typography>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
