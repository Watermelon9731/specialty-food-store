import { NextResponse } from "next/server";
import {
  createProductService,
  getProductsService,
} from "@/server/products/service";
import { ProductSchema } from "@/server/products/schemas";

export async function GET() {
  try {
    const products = await getProductsService();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const validated = ProductSchema.parse(json);
    const product = await createProductService(validated);
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
