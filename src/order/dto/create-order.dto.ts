import { ApiProperty } from '@nestjs/swagger';
import { OrderType } from '../order.constants';
import mongoose from 'mongoose';

export class CreateOrderDto {
  @ApiProperty({
    type: String,
  })
  productID: mongoose.Types.ObjectId;
  @ApiProperty({ enum: OrderType })
  orderType: OrderType;
  @ApiProperty({
    type: Number,
    required: true,
  })
  quantity: number;
}
