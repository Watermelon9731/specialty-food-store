
import { NextResponse } from "next/server";
import {
  createCategoryService,
  getCategoriesService,
} from "@/server/categories/service";
import { CategorySchema } from "@/server/categories/schemas";

export async function GET() {
  try {
    const categories = await getCategoriesService();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const validated = CategorySchema.parse(json);
    const category = await createCategoryService(validated);
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
