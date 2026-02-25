export const runtime = "edge";

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") ?? "";
    const page = Math.max(1, Number(searchParams.get("page") ?? 1));
    const pageSize = Math.min(
      100,
      Math.max(1, Number(searchParams.get("pageSize") ?? 20)),
    );

    // Group by customerName + customerPhone via raw SQL through Supabase RPC
    // or aggregate client-side from orders
    let query = db
      .from("Order")
      .select("customerName, customerPhone, amount")
      .eq("isDeleted", false);

    if (search) {
      query = query.or(
        `customerName.ilike.%${search}%,customerPhone.ilike.%${search}%`,
      );
    }

    const { data, error } = await query;
    if (error) throw error;

    // Group client-side
    const grouped = new Map<
      string,
      {
        customerName: string;
        customerPhone: string;
        orderCount: number;
        totalSpent: number;
      }
    >();
    for (const o of data ?? []) {
      const key = `${o.customerName}__${o.customerPhone}`;
      if (!grouped.has(key)) {
        grouped.set(key, {
          customerName: o.customerName,
          customerPhone: o.customerPhone,
          orderCount: 0,
          totalSpent: 0,
        });
      }
      const g = grouped.get(key)!;
      g.orderCount += 1;
      g.totalSpent += Number(o.amount ?? 0);
    }

    const all = [...grouped.values()].sort(
      (a, b) => b.orderCount - a.orderCount,
    );
    const total = all.length;
    const paginated = all.slice((page - 1) * pageSize, page * pageSize);
    const customers = paginated.map((g) => ({
      ...g,
      totalSpentFormatted: `${new Intl.NumberFormat("vi-VN").format(g.totalSpent)} VNĐ`,
    }));

    return NextResponse.json({
      success: true,
      customers,
      pagination: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error("Customers GET Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch customers" },
      { status: 500 },
    );
  }
}
