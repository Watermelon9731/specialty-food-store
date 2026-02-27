import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/cron/keep-alive
 *
 * Pings Supabase with a lightweight query to prevent the free-tier
 * project from pausing after 7 days of inactivity.
 *
 * Protected by CRON_SECRET env var — external cron services must
 * include ?key=<secret> or Authorization: Bearer <secret>.
 */
export async function GET(req: Request) {
  // ── Auth check ──
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const url = new URL(req.url);
    const keyParam = url.searchParams.get("key");
    const bearerToken = req.headers
      .get("authorization")
      ?.replace("Bearer ", "");

    if (keyParam !== secret && bearerToken !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // ── Ping Supabase ──
  try {
    const start = Date.now();
    const { count, error } = await db
      .from("Category")
      .select("*", { count: "exact", head: true });

    const duration = Date.now() - start;

    if (error) {
      console.error("[keep-alive] Supabase error:", error.message);
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 },
      );
    }

    console.log(
      `[keep-alive] Supabase pinged OK — ${count} categories, ${duration}ms`,
    );

    return NextResponse.json({
      ok: true,
      timestamp: new Date().toISOString(),
      duration: `${duration}ms`,
      categories: count,
    });
  } catch (err) {
    console.error("[keep-alive] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
