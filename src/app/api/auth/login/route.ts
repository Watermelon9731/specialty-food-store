export const runtime = "edge";

import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { TOKEN } from "@/constants/token";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    if (!ADMIN_PASSWORD || ADMIN_PASSWORD.length === 0) {
      return NextResponse.json(
        { message: "Server misconfiguration. No admin password set." },
        { status: 500 },
      );
    }

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { message: `Invalid password` },
        { status: 401 },
      );
    }

    // Set the cookie
    const token = await signToken({
      admin: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });

    const cookieStore = await cookies();
    cookieStore.set({
      name: TOKEN.ADMIN,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60, // 1 day
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
