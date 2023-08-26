import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type CartDoc = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
  @Prop({
    type: String,
    required: true,
  })
  productName: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  })
  productId: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  @Prop({
    type: Number,
    required: true,
  })
  quantity: number;

  @Prop({
    type: Number,
    required: true,
  })
  discount: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: mongoose.Schema.Types.ObjectId;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
