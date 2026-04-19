import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { error: "Error al obtener productos." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const payload = await request.json();

    const created = await Product.create({
      name: payload?.name,
      price: payload?.price,
      stock: payload?.stock ?? 0,
      description: payload?.description,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { error: "Error al crear producto." },
      { status: 500 },
    );
  }
}
