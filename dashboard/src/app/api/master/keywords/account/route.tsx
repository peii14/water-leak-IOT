import { NextRequest } from 'next/server';

import {
  buildPrismaIncludeClause,
  internalServerErrorResponse,
  parseQueryParams,
  successResponse,
  unauthorizedResponse,
} from '@/_lib/apiHelpers';
import { getServerSessions } from '@/_lib/serverSession';

export async function GET(req: NextRequest) {
  const sessions = await getServerSessions();
  const user_id = Number(req.nextUrl.searchParams.get('user_id'));
  if (!sessions || !user_id || sessions.user.role.name !== 'Supervisor') {
    return unauthorizedResponse();
  }
  const session_id = Number(sessions.user.id);
  if (session_id !== user_id) {
    return unauthorizedResponse();
  }
  const { relatedTables } = parseQueryParams(req);

  try {
    const inclueClause = buildPrismaIncludeClause(relatedTables);

    const response = await prisma.users.findUnique({
      include: inclueClause,
      where: {
        id: sessions.user.id,
      },
    });
    return successResponse(
      response,
      { last_page: 0, total: 0 },
      'fetched successfully'
    );
  } catch (e) {
    return internalServerErrorResponse();
  }
}
export async function DELETE(req: NextRequest) {
  const sessions = await getServerSessions();
  if (!sessions || sessions.user.role.name !== 'Supervisor') {
    return unauthorizedResponse();
  }
  const { keywords_id }: { keywords_id: number } = await req.json();

  try {
    await prisma.users.update({
      data: {
        keywords: { disconnect: { id: Number(keywords_id) } },
      },
      where: {
        id: sessions.user.id,
      },
    });
    return successResponse(null);
  } catch (e) {
    return internalServerErrorResponse();
  }
}
export const PATCH = async (req: NextRequest) => {
  const sessions = await getServerSessions();
  if (!sessions || sessions.user.role.name !== 'Supervisor') {
    return unauthorizedResponse();
  }

  try {
    const { keywords_id }: { keywords_id: number } = await req.json();
    const response = await prisma.users.update({
      data: {
        keywords: { connect: { id: Number(keywords_id) } },
      },
      where: {
        id: sessions.user.id,
      },
    });
    return successResponse(response);
  } catch (e) {
    return internalServerErrorResponse();
  }
};
