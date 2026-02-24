import { db } from "@/lib/db";
import { NextResponse } from "next/server";

const PAGE_SIZE_DEFAULT = 10;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));

    // ── CREATE ────────────────────────────────────────────────────────────────
    if (body.action === "create") {
      const {
        customerName,
        customerPhone,
        customerAddress,
        productName,
        amount,
        status,
        isDeleted,
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
          isDeleted: isDeleted || false,
        },
      });
      return NextResponse.json({ success: true, order });
    }

    // ── LIST with pagination + date filter ────────────────────────────────────
    const page = Math.max(1, Number(body.page) || 1);
    const pageSize = Math.min(
      100,
      Math.max(1, Number(body.pageSize) || PAGE_SIZE_DEFAULT),
    );

    const defaultDateFrom = new Date();
    defaultDateFrom.setMonth(defaultDateFrom.getMonth() - 6);

    const dateFrom = body.dateFrom ? new Date(body.dateFrom) : defaultDateFrom;
    const dateTo = body.dateTo ? new Date(body.dateTo) : new Date();

    const statusFilter =
      body.statuses && Array.isArray(body.statuses) && body.statuses.length > 0
        ? { status: { in: body.statuses } }
        : {};

    const where = {
      ...statusFilter,
      isDeleted: false,
      createdAt: { gte: dateFrom, lte: dateTo },
      ...(body.customerPhone && { customerPhone: body.customerPhone }),
    };

    const [total, dbOrders] = await db.$transaction([
      db.order.count({ where }),
      db.order.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    const orders = dbOrders.map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      customerName: o.customerName,
      customerPhone: o.customerPhone,
      customerAddress: o.customerAddress,
      productName: o.productName,
      status: o.status,
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
  } catch (error) {
    console.error("Orders API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process orders request" },
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
      productName,
      amount,
      status,
    } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Thiếu ID đơn hàng" },
        { status: 400 },
      );
    }

    const order = await db.order.update({
      where: { id },
      data: {
        ...(customerName !== undefined && { customerName }),
        ...(customerPhone !== undefined && { customerPhone }),
        ...(customerAddress !== undefined && { customerAddress }),
        ...(productName !== undefined && { productName }),
        ...(amount !== undefined && { amount: Number(amount) }),
        ...(status !== undefined && { status }),
      },
    });

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

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Thiếu ID đơn hàng" },
        { status: 400 },
      );
    }

    // Soft delete
    await db.order.update({ where: { id }, data: { isDeleted: true } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Orders DELETE Error:", error);
    return NextResponse.json(
      { success: false, error: "Không thể xóa đơn hàng" },
      { status: 500 },
    );
  }
}
