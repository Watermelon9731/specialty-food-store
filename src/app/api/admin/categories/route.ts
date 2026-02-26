
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data: categories, error } = await db
      .from("Category")
      .select("id, name")
      .order("name", { ascending: true });

    if (error) throw error;
    return NextResponse.json({ success: true, categories });
  } catch (error) {
    console.error("Categories GET Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}
