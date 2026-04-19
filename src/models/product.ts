import mongoose, { Model, Schema } from "mongoose";

export type ProductDocument = {
  name: string;
  price: number;
  stock: number;
  description: string;
  createdAt: Date;
};

const productSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    description: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  },
);

const ProductModel: Model<ProductDocument> =
  mongoose.models.Product ||
  mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel;
