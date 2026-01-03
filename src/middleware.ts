import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  // Protected routes that require authentication
  const protectedRoutes = ["/settings", "/quizHistory", "/achievements"];

  // Auth routes that should redirect authenticated users
  const authRoutes = ["/auth/login", "/auth/register"];

  // Redirect authenticated users away from auth pages
  if (sessionCookie && authRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect unauthenticated users to login for protected routes
  if (!sessionCookie && protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/settings/:path*",
    "/quizHistory/:path*",
    "/achievements/:path*",
    "/auth/:path*",
  ],
};
