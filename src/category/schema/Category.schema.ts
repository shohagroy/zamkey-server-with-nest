import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDoc = Category & Document;

@Schema({ timestamps: true })
export class Category {
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

  @Prop()
  subCategories: [string];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
