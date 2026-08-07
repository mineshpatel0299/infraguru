import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth-constants";

// Optimistic check only — redirects unauthenticated visitors away from
// /admin before any rendering happens. The admin layout still performs the
// real JWT verification, since proxy is not meant to be a full session
// management solution (see Next.js proxy guide: guides/authentication#optimistic-checks-with-proxy-optional).
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const hasSession = request.cookies.has(SESSION_COOKIE);
    if (!hasSession) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
