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

  @Prop({
    type: {
      id: String,
      url: String,
    },
  })
  icon?: {
    id: string;
    url: string;
  };

  @Prop()
  subCategories: [string];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
