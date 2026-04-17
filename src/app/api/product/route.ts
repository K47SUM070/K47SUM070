import { connectDB } from "@/lib/db";
import Product from "@/models/product";

// 👉 GET: traer productos
export async function GET() {
  try {
    await connectDB();

    const products = await Product.find();

    return Response.json(products);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error al obtener productos" }, { status: 500 });
  }
}

// 👉 POST: crear producto
export async function POST(req: Request) {
  try {
    await connectDB();

    const data = await req.json();

    const product = await Product.create(data);

    return Response.json(product);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error al crear producto" }, { status: 500 });
  }
}