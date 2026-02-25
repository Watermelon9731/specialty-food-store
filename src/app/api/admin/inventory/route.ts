export const runtime = 'edge';

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") ?? "";
    const categoryId = searchParams.get("categoryId") ?? undefined;
    const page = Math.max(1, Number(searchParams.get("page") ?? 1));
    const pageSize = Math.min(
      100,
      Math.max(1, Number(searchParams.get("pageSize") ?? 20)),
    );

    const where = {
      isDeleted: false,
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { sku: { contains: search, mode: "insensitive" as const } },
        ],
      }),
      ...(categoryId && { categoryId }),
    };

    const [total, products] = await db.$transaction([
      db.product.count({ where }),
      db.product.findMany({
        where,
        include: { category: { select: { id: true, name: true } } },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    return NextResponse.json({
      success: true,
      products,
      pagination: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error("Inventory GET Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      sku,
      description,
      pricePerUnit,
      unitType,
      stockQuantity,
      origin,
      shelfLifeDays,
      categoryId,
    } = body;

    if (!name || !sku || !pricePerUnit || !unitType || !categoryId) {
      return NextResponse.json(
        { success: false, error: "Thiếu thông tin bắt buộc" },
        { status: 400 },
      );
    }

    const product = await db.product.create({
      data: {
        name,
        sku,
        description: description || null,
        pricePerUnit: Number(pricePerUnit),
        unitType,
        stockQuantity: Number(stockQuantity) || 0,
        origin: origin || "Việt Nam",
        shelfLifeDays: Number(shelfLifeDays) || 365,
        categoryId,
      },
      include: { category: { select: { id: true, name: true } } },
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error: any) {
    console.error("Inventory POST Error:", error);
    if (error?.code === "P2002") {
      return NextResponse.json(
        { success: false, error: "SKU đã tồn tại" },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { success: false, error: "Không thể tạo sản phẩm" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Thiếu ID sản phẩm" },
        { status: 400 },
      );
    }

    const product = await db.product.update({
      where: { id },
      data: {
        ...(updates.name !== undefined && { name: updates.name }),
        ...(updates.sku !== undefined && { sku: updates.sku }),
        ...(updates.description !== undefined && {
          description: updates.description,
        }),
        ...(updates.pricePerUnit !== undefined && {
          pricePerUnit: Number(updates.pricePerUnit),
        }),
        ...(updates.unitType !== undefined && { unitType: updates.unitType }),
        ...(updates.stockQuantity !== undefined && {
          stockQuantity: Number(updates.stockQuantity),
        }),
        ...(updates.origin !== undefined && { origin: updates.origin }),
        ...(updates.shelfLifeDays !== undefined && {
          shelfLifeDays: Number(updates.shelfLifeDays),
        }),
        ...(updates.categoryId !== undefined && {
          categoryId: updates.categoryId,
        }),
      },
      include: { category: { select: { id: true, name: true } } },
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Inventory PATCH Error:", error);
    return NextResponse.json(
      { success: false, error: "Không thể cập nhật sản phẩm" },
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
        { success: false, error: "Thiếu ID sản phẩm" },
        { status: 400 },
      );
    }

    // Soft delete
    await db.product.update({
      where: { id },
      data: { isDeleted: true },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Inventory DELETE Error:", error);
    return NextResponse.json(
      { success: false, error: "Không thể xóa sản phẩm" },
      { status: 500 },
    );
  }
}
