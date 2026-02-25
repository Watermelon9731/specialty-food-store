export const runtime = 'edge';

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

    // Group orders by customerName + customerPhone to derive unique customers
    const grouped = await db.order.groupBy({
      by: ["customerName", "customerPhone"],
      where: {
        isDeleted: false,
        ...(search && {
          OR: [
            { customerName: { contains: search, mode: "insensitive" } },
            { customerPhone: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
      _count: { id: true },
      _sum: { amount: true },
      orderBy: { _count: { id: "desc" } },
    });

    const total = grouped.length;
    const paginated = grouped.slice((page - 1) * pageSize, page * pageSize);

    const customers = paginated.map((g) => ({
      customerName: g.customerName,
      customerPhone: g.customerPhone,
      orderCount: g._count.id,
      totalSpent: Number(g._sum.amount ?? 0),
      totalSpentFormatted: `${new Intl.NumberFormat("vi-VN").format(Number(g._sum.amount ?? 0))} VNĐ`,
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
