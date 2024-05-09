import { getServerSession } from 'next-auth';

import { authOptions } from '@/_lib/auth';

export async function getServerSessions() {
  return await getServerSession(authOptions);
}
