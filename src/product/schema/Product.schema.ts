import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ProductDoc = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  })
  title: string;

  @Prop()
  description: string;

  @Prop()
  images: Array<{ id: string; url: string }>;

  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  @Prop({ type: Number, default: 0 })
  discount: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  subcategory: mongoose.Schema.Types.ObjectId;

  @Prop()
  brand: string;

  @Prop()
  sku: number;

  @Prop()
  tags: [string];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
