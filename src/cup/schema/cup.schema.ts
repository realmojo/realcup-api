import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { CONSTANT_CATEGORY } from 'src/category/schema/constant';
import { CUP_STATUS } from './constant';

export type CupDocument = Cup & Document;

@Schema()
export class Cup {
  @Prop()
  _id: mongoose.Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  playCount: number;

  @Prop()
  status: CUP_STATUS;

  @Prop()
  category: CONSTANT_CATEGORY;

  @Prop()
  created: number;
}

export const CupSchema = SchemaFactory.createForClass(Cup);
