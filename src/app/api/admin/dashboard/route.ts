export const runtime = "edge";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Monthly revenue for last 12 months using Supabase RPC (raw SQL)
    const { data, error } = await db.rpc("get_monthly_revenue");

    if (error) {
      // Fallback: fetch recent paid orders and aggregate client-side
      const since = new Date();
      since.setMonth(since.getMonth() - 12);

      const { data: orders, error: ordErr } = await db
        .from("Order")
        .select("amount, createdAt")
        .eq("status", "paid")
        .eq("isDeleted", false)
        .gte("createdAt", since.toISOString());

      if (ordErr) throw ordErr;

      // Group by month client-side
      const monthMap = new Map<string, { revenue: number; count: number }>();
      for (const o of orders ?? []) {
        const month = o.createdAt.slice(0, 7); // "YYYY-MM"
        if (!monthMap.has(month)) monthMap.set(month, { revenue: 0, count: 0 });
        const m = monthMap.get(month)!;
        m.revenue += Number(o.amount ?? 0);
        m.count += 1;
      }
      const monthlyRevenue = [...monthMap.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([month, v]) => ({ month, ...v }));

      return NextResponse.json({ success: true, stats: { monthlyRevenue } });
    }

    return NextResponse.json({
      success: true,
      stats: { monthlyRevenue: data },
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch dashboard stats" },
      { status: 500 },
    );
  }
}
