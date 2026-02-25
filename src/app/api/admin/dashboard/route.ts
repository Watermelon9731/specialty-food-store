export const runtime = 'edge';

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const monthlyRevenue = await db.$queryRaw<{
      month: string;
      revenue: number;
      count: number;
    }>`
    SELECT 
    DATE_TRUNC('month', "createdAt") AS month,
    SUM("amount")::FLOAT AS revenue,
    COUNT("id")::INT AS count
    FROM "Order"
    WHERE "status" = 'paid'
    AND "isDeleted" = false
    AND "createdAt" >= CURRENT_DATE - INTERVAL '12 months'
    GROUP BY DATE_TRUNC('month', "createdAt")
    ORDER BY month ASC
    `;

    return NextResponse.json({
      success: true,
      stats: {
        monthlyRevenue,
      },
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch dashboard stats" },
      { status: 500 },
    );
  }
}
