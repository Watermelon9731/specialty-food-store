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

    let query = db
      .from("Product")
      .select("*, category:Category(id, name)", { count: "exact" })
      .eq("isDeleted", false)
      .order("createdAt", { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (search) {
      query = query.or(`name.ilike.%${search}%,sku.ilike.%${search}%`);
    }
    if (categoryId) {
      query = query.eq("categoryId", categoryId);
    }

    const { data: products, count, error } = await query;
    if (error) throw error;

    const total = count ?? 0;
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
      slug,
      isFeatured,
      img,
      note,
    } = body;

    if (!name || !sku || !slug || !pricePerUnit || !unitType || !categoryId) {
      return NextResponse.json(
        { success: false, error: "Thiếu thông tin bắt buộc" },
        { status: 400 },
      );
    }

    const { data: product, error } = await db
      .from("Product")
      .insert({
        name,
        sku,
        description: description || null,
        pricePerUnit: Number(pricePerUnit),
        unitType,
        stockQuantity: Number(stockQuantity) || 0,
        origin: origin || "Việt Nam",
        shelfLifeDays: Number(shelfLifeDays) || 365,
        categoryId,
        slug,
        isFeatured: !!isFeatured,
        img: img || null,
        note: note || null,
      })
      .select("*, category:Category(id, name)")
      .single();

    if (error) {
      if (error.code === "23505") {
        // unique violation
        return NextResponse.json(
          { success: false, error: "SKU đã tồn tại" },
          { status: 409 },
        );
      }
      throw error;
    }

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.error("Inventory POST Error:", error);
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
    if (!id)
      return NextResponse.json(
        { success: false, error: "Thiếu ID sản phẩm" },
        { status: 400 },
      );

    const updateData: Record<string, unknown> = {};
    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.sku !== undefined) updateData.sku = updates.sku;
    if (updates.description !== undefined)
      updateData.description = updates.description;
    if (updates.pricePerUnit !== undefined)
      updateData.pricePerUnit = Number(updates.pricePerUnit);
    if (updates.unitType !== undefined) updateData.unitType = updates.unitType;
    if (updates.stockQuantity !== undefined)
      updateData.stockQuantity = Number(updates.stockQuantity);
    if (updates.origin !== undefined) updateData.origin = updates.origin;
    if (updates.shelfLifeDays !== undefined)
      updateData.shelfLifeDays = Number(updates.shelfLifeDays);
    if (updates.categoryId !== undefined)
      updateData.categoryId = updates.categoryId;
    if (updates.slug !== undefined) updateData.slug = updates.slug;
    if (updates.isFeatured !== undefined)
      updateData.isFeatured = updates.isFeatured;
    if (updates.img !== undefined) updateData.img = updates.img;
    if (updates.note !== undefined) updateData.note = updates.note;

    const { data: product, error } = await db
      .from("Product")
      .update(updateData)
      .eq("id", id)
      .select("*, category:Category(id, name)")
      .single();

    if (error) throw error;
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
    if (!id)
      return NextResponse.json(
        { success: false, error: "Thiếu ID sản phẩm" },
        { status: 400 },
      );

    const { error } = await db
      .from("Product")
      .update({ isDeleted: true })
      .eq("id", id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Inventory DELETE Error:", error);
    return NextResponse.json(
      { success: false, error: "Không thể xóa sản phẩm" },
      { status: 500 },
    );
  }
}
