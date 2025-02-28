// app/api/check-ban-status/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Get the session token from the request cookies directly
    const sessionToken = request.cookies.get('sessionToken')?.value;

    if (!sessionToken) {
      return NextResponse.json({ banned: false });
    }

    const session = await prisma.session.findUnique({
      where: { token: sessionToken },
      include: { user: true },
    });

    if (!session) {
      return NextResponse.json({ banned: false });
    }

    // Check if user is banned and if the ban is still active
    const isBanned = session.user.banned === true;
    const isBanActive = isBanned && (!session.user.banExpires || new Date() < session.user.banExpires);

    return NextResponse.json({ 
      banned: isBanActive,
      reason: isBanActive ? session.user.banReason : null,
      expires: isBanActive ? session.user.banExpires : null
    });
  } catch (error) {
    console.error("Error checking ban status:", error);
    return NextResponse.json({ banned: false, error: "Failed to check ban status" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}