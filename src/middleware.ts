import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";
import { PATH } from "@/constants/path";
import { TOKEN } from "@/constants/token";

export async function middleware(req: NextRequest) {
  const adminToken = req.cookies.get(TOKEN.ADMIN)?.value;

  const url = req.nextUrl.clone();
  const isAdminPath = url.pathname.startsWith(PATH.ADMIN.DASHBOARD);
  const isLoginPath = url.pathname === PATH.ADMIN.LOGIN;

  // Protect all /admin routes except the login page
  if (isAdminPath && !isLoginPath) {
    if (!adminToken) {
      url.pathname = PATH.ADMIN.LOGIN;
      return NextResponse.redirect(url);
    }

    try {
      const payload = await verifyToken(adminToken);
      if (!payload || !payload.admin) {
        url.pathname = PATH.ADMIN.LOGIN;
        return NextResponse.redirect(url);
      }
    } catch {
      url.pathname = PATH.ADMIN.LOGIN;
      return NextResponse.redirect(url);
    }
  }

  // Redirect away from login page if already authenticated
  if (isLoginPath && adminToken) {
    try {
      const payload = await verifyToken(adminToken);
      if (payload && payload.admin) {
        url.pathname = PATH.ADMIN.DASHBOARD;
        return NextResponse.redirect(url);
      }
    } catch {
      // Token invalid, let them through to login
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
