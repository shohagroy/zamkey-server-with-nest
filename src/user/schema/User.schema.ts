import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDoc = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({
    type: String,
    lowercase: true,
  })
  firstName: string;

  @Prop({
    type: String,
    lowercase: true,
  })
  lastName: string;

  @Prop()
  avatar: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
  })
  email: string;

  @Prop({
    type: String,
    select: 0,
    required: true,
  })
  password: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  zip: string;

  @Prop({
    type: String,
    enum: ['user', 'admin', 'superadmin'],
    required: true,
    lowercase: true,
  })
  role: string;

  @Prop()
  cartList: [string];
}

export const UserSchema = SchemaFactory.createForClass(User);
