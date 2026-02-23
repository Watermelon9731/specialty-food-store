import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));

    // If there's an action for "create", insert a new record
    if (body.action === "create") {
      const {
        customerName,
        customerPhone,
        customerAddress,
        productName,
        amount,
        status,
      } = body;

      const newOrderNumber = `#${Math.floor(1000 + Math.random() * 9000)}`;

      const order = await db.order.create({
        data: {
          orderNumber: newOrderNumber,
          customerName: customerName || "Unknown Customer",
          customerPhone: customerPhone || "N/A",
          customerAddress: customerAddress || "N/A",
          productName: productName || "",
          amount: amount ? Number(amount) : 0,
          status: status || "processing",
        },
      });
      return NextResponse.json({ success: true, order });
    }

    // Default: Return all orders from DB
    const dbOrders = await db.order.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Transform them to match the UI component signature
    const orders = dbOrders.map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      customerName: o.customerName,
      customerPhone: o.customerPhone,
      customerAddress: o.customerAddress,
      status: o.status,
      date: new Date(o.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      amount: `${new Intl.NumberFormat("vi-VN").format(Number(o.amount))} VNĐ`,
    }));

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Orders API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process orders request" },
      { status: 500 },
    );
  }
}
