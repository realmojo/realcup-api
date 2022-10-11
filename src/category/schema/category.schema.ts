import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { CONSTANT_CATEGORY } from './constant';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop()
  _id: mongoose.Types.ObjectId;

  @Prop()
  title: CONSTANT_CATEGORY;

  @Prop()
  sort: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
