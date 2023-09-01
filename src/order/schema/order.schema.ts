import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Delivary_status, OrderType } from '../order.constants';

export type OrderDoc = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({
    type: String,
    required: true,
  })
  productName: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: true,
  })
  productID: mongoose.Types.ObjectId;

  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  @Prop({
    type: Number,
    required: true,
  })
  discount: number;

  @Prop({
    type: Number,
    required: true,
  })
  quantity: number;

  @Prop({
    type: String,
    required: true,
  })
  paymentMethod: OrderType;

  @Prop({
    type: Number,
    required: true,
  })
  totalPrice: number;
  @Prop({
    type: String,
    required: true,
  })
  userId: string;

  @Prop({
    type: String,
    required: true,
    default: Delivary_status.PENDING,
  })
  delivary_status: Delivary_status;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
