import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type SubCategoryDoc = SubCategory & Document;

@Schema({ timestamps: true })
export class SubCategory {
  @Prop({
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  })
  name: string;

  @Prop()
  description: string;

  @Prop()
  icon: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: [string];
}

export const subCategorySchema = SchemaFactory.createForClass(SubCategory);
