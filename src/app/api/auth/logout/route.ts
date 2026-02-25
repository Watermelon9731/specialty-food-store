export const runtime = 'edge';

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { TOKEN } from "@/constants/token";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN.ADMIN);

  return NextResponse.json({ success: true });
}
