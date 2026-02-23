import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function proxy(req: NextRequest) {
  const adminToken = req.cookies.get("admin_token")?.value;

  const url = req.nextUrl.clone();
  const isAdminPath = url.pathname.startsWith("/admin");
  const isLoginPath = url.pathname === "/admin/login";

  // Protect all /admin routes except the login page
  if (isAdminPath && !isLoginPath) {
    if (!adminToken) {
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }

    try {
      const payload = await verifyToken(adminToken);
      if (!payload || !payload.admin) {
        url.pathname = "/admin/login";
        return NextResponse.redirect(url);
      }
    } catch (e) {
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  // Redirect away from login page if already authenticated
  if (isLoginPath && adminToken) {
    try {
      const payload = await verifyToken(adminToken);
      if (payload && payload.admin) {
        url.pathname = "/admin";
        return NextResponse.redirect(url);
      }
    } catch {
      // Ignored: Token invalid, proceed to login page
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
