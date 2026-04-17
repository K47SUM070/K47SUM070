import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  nombre: { type: String },
  precio: { type: Number },
  stock: { type: Number },
  codigo: { type: String },
  imagenes: [{ type: String }],
});

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;