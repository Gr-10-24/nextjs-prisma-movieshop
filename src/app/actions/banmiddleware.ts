import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Create a new PrismaClient instance for the middleware
// Note: For production, consider using a singleton pattern for PrismaClient
const prisma = new PrismaClient();

export async function middleware(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get('sessionToken')?.value;

    if (sessionToken) {
      // Find the session and include the user
      const session = await prisma.session.findUnique({
        where: { token: sessionToken },
        include: { user: true },
      });

      // Check if user is banned and if the ban is still active
      if (session?.user?.banned) {
        console.log("User is banned. Redirecting...");
        const isBanActive = !session.user.banExpires || new Date() < session.user.banExpires;
        
        if (isBanActive) {
          // Create a response that redirects to the movies page
          console.log("Ban is active. Redirecting to /banned");
          const response = NextResponse.redirect(new URL('/banned', req.url));
          
          // Clear the session cookie
          response.cookies.set("sessionToken", "", { 
            maxAge: 0, 
            path: "/",
            httpOnly: true,
            sameSite: "lax"
          });
          
          return response;
        }
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    // On error, allow the request to continue to prevent locking users out
    return NextResponse.next();
  } finally {
    // Disconnect from Prisma to prevent connection leaks
    await prisma.$disconnect();
  }
}

// Apply this middleware to all authenticated routes
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/admin/:path*',
    '/protected/:path*',
    // Add other protected routes here
  ],
};