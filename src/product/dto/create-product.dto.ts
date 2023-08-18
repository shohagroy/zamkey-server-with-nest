import mongoose from 'mongoose';

export class CreateProductDto {
  title: string;
  description?: string;
  price: number;
  discount: number;
  category: mongoose.Schema.Types.ObjectId;
  subcategory: mongoose.Schema.Types.ObjectId;
  brand?: string;
  sku?: number;
  tags: [string];
}
