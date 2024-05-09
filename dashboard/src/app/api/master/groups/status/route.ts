import { NextRequest } from 'next/server';

import {
  internalServerErrorResponse,
  successResponse,
  unauthorizedResponse,
} from '@/_lib/apiHelpers';
import { getServerSessions } from '@/_lib/serverSession';

export async function PUT(req: NextRequest) {
  const sessions = await getServerSessions();
  if (!sessions || sessions.user.role.name !== 'Deans') {
    return unauthorizedResponse();
  }
  try {
    const { id } = await req.json();
    const group = await prisma.groups.findUnique({
      where: {
        id,
      },
    });

    if (!group) {
      return internalServerErrorResponse();
    }

    const updatedStatus = !group.group_status;

    const response = await prisma.groups.update({
      where: {
        id,
      },
      data: {
        group_status: updatedStatus,
      },
    });
    return successResponse(response);
  } catch (e) {
    return internalServerErrorResponse();
  }
}
