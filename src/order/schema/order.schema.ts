import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OrderType } from '../order.constants';

export type OrderDoc = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({
    type: String,
    required: true,
  })
  productName: string;

  @Prop({
    type: String,
    required: true,
  })
  productCategory: string;

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
  })
  delivary_status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
