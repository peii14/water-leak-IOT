import { NextRequest } from 'next/server';

import {
  internalServerErrorResponse,
  successResponse,
  unauthorizedResponse,
} from '@/_lib/apiHelpers';
import { prisma } from '@/_lib/prisma';
import { getServerSessions } from '@/_lib/serverSession';

export async function PATCH(req: NextRequest) {
  const sessions = await getServerSessions();
  if (!sessions || sessions.user.role.name !== 'Student') {
    return unauthorizedResponse();
  }
  try {
    const { id, student_id } = await req.json();
    const response = await prisma.supervisor_recomendations.update({
      where: {
        id: parseInt(id),
      },
      data: {
        students: {
          connect: {
            id: parseInt(student_id),
          },
        },
      },
      include: {
        draft: true,
      },
    });
    return successResponse(response);
  } catch (e) {
    return internalServerErrorResponse();
  }
}
