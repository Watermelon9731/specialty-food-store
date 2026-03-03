import { db } from "@/lib/db";
import { NextResponse } from "next/server";

const PAGE_SIZE_DEFAULT = 10;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));

    // ── CREATE ──────────────────────────────────────────────────────────────
    if (body.action === "create") {
      const {
        customerName,
        customerPhone,
        customerAddress,
        orderDescription,
        amount,
        deliveryStatus,
        paymentStatus,
        isDeleted,
      } = body;
      const orderNumber = `#${Math.floor(1000 + Math.random() * 9000)}`;

      const { data: order, error } = await db
        .from("Order")
        .insert({
          id: crypto.randomUUID(),
          orderNumber,
          customerName: customerName || "Unknown Customer",
          customerPhone: customerPhone || "N/A",
          customerAddress: customerAddress || "N/A",
          orderDescription: orderDescription || "",
          amount: amount ? Number(amount) : 0,
          deliveryStatus: deliveryStatus || "processing",
          paymentStatus: paymentStatus || "unpaid",
          isDeleted: isDeleted || false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json({ success: true, order });
    }

    // ── LIST with pagination + date filter ─────────────────────────────────
    const page = Math.max(1, Number(body.page) || 1);
    const pageSize = Math.min(
      100,
      Math.max(1, Number(body.pageSize) || PAGE_SIZE_DEFAULT),
    );

    const defaultDateFrom = new Date();
    defaultDateFrom.setMonth(defaultDateFrom.getMonth() - 6);
    const dateFrom = body.dateFrom ? new Date(body.dateFrom) : defaultDateFrom;
    const dateTo = body.dateTo ? new Date(body.dateTo) : new Date();

    let query = db
      .from("Order")
      .select("*", { count: "exact" })
      .eq("isDeleted", false)
      .gte("createdAt", dateFrom.toISOString())
      .lte("createdAt", dateTo.toISOString())
      .order("createdAt", { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (body.deliveryStatuses?.length > 0) {
      query = query.in("deliveryStatus", body.deliveryStatuses);
    }
    if (body.paymentStatuses?.length > 0) {
      query = query.in("paymentStatus", body.paymentStatuses);
    }
    if (body.customerPhone) {
      query = query.eq("customerPhone", body.customerPhone);
    }

    const { data, count, error } = await query;
    if (error) throw error;

    const total = count ?? 0;
    const orders = (data ?? []).map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      customerName: o.customerName,
      customerPhone: o.customerPhone,
      customerAddress: o.customerAddress,
      orderDescription: o.orderDescription,
      deliveryStatus: o.deliveryStatus,
      paymentStatus: o.paymentStatus,
      rawAmount: Number(o.amount),
      date: new Date(o.createdAt).toLocaleDateString("vi-VN", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      amount: `${new Intl.NumberFormat("vi-VN").format(Number(o.amount))} VNĐ`,
    }));

    return NextResponse.json({
      success: true,
      orders,
      pagination: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error: any) {
    console.error("Orders API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to process orders request",
        stack: error?.stack,
      },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const {
      id,
      customerName,
      customerPhone,
      customerAddress,
      orderDescription,
      amount,
      deliveryStatus,
      paymentStatus,
    } = body;
    if (!id)
      return NextResponse.json(
        { success: false, error: "Thiếu ID đơn hàng" },
        { status: 400 },
      );

    const updateData: Record<string, unknown> = {};
    if (customerName !== undefined) updateData.customerName = customerName;
    if (customerPhone !== undefined) updateData.customerPhone = customerPhone;
    if (customerAddress !== undefined)
      updateData.customerAddress = customerAddress;
    if (orderDescription !== undefined)
      updateData.orderDescription = orderDescription;
    if (amount !== undefined) updateData.amount = Number(amount);
    if (deliveryStatus !== undefined)
      updateData.deliveryStatus = deliveryStatus;
    if (paymentStatus !== undefined) updateData.paymentStatus = paymentStatus;
    updateData.updatedAt = new Date().toISOString();

    const { data: order, error } = await db
      .from("Order")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Orders PATCH Error:", error);
    return NextResponse.json(
      { success: false, error: "Không thể cập nhật đơn hàng" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id)
      return NextResponse.json(
        { success: false, error: "Thiếu ID đơn hàng" },
        { status: 400 },
      );

    const { error } = await db
      .from("Order")
      .update({ isDeleted: true })
      .eq("id", id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Orders DELETE Error:", error);
    return NextResponse.json(
      { success: false, error: "Không thể xóa đơn hàng" },
      { status: 500 },
    );
  }
}
