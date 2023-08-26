import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export class CreateProductDto {
  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  discount: number;

  @ApiProperty()
  category: mongoose.Schema.Types.ObjectId;

  @ApiProperty()
  subcategory: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ required: false })
  brand?: string;

  @ApiProperty({ required: false })
  sku?: number;

  @ApiProperty()
  tags: [string];
}
