import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { username, password, name, role } = await req.json();
  try {
    const existingUser = await prisma.users.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'username already in use' },
        { status: 400 }
      );
    }

    const hashedPassword = await argon2.hash(password);

    await prisma.users.create({
      data: {
        username,
        name: name,
        created_at: new Date(),
        role_id: role,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: 'User created' });
  } catch (error) {
    return NextResponse.json(
      { error: `An internal server error occurred: ${error}` },
      { status: 500 }
    );
  }
}
