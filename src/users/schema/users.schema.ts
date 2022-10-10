import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { USER_STATUS } from './constant';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  _id: mongoose.Types.ObjectId;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  status: USER_STATUS;

  @Prop()
  created: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
