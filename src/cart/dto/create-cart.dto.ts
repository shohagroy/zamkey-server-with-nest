import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export class CreateCartDto {
  @ApiProperty({ required: false })
  productName: string;

  @ApiProperty()
  productId: mongoose.Types.ObjectId;

  @ApiProperty({ required: false })
  price: number;

  @ApiProperty({ required: false })
  quantity: number;

  @ApiProperty({ required: false })
  discount: number;

  @ApiProperty({ required: false })
  userId: mongoose.Types.ObjectId;
}
