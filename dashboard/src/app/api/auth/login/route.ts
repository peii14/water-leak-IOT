import { PrismaClient } from '@prisma/client';
import argon from 'argon2';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { username, password } = await req.json();
  try {
    const user = await prisma.users.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({ error: 'No user.' }, { status: 400 });
    }
    const valid = await argon.verify(user.password, password);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid password.' }, { status: 400 });
    }
    return NextResponse.json(
      { message: 'Logged in successfully' },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ error: 'Unknown error.' }, { status: 400 });
  }
}
