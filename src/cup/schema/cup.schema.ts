import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { CONSTANT_CATEGORY } from 'src/category/schema/constant';
import { CUP_STATUS } from './constant';

export type CupDocument = Cup & Document;

@Schema()
export class Images {
  @Prop()
  name: string;

  @Prop()
  url: string;
}
const ImagesSchema = SchemaFactory.createForClass(Images);

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

  @Prop({ type: [ImagesSchema] })
  images: Images[];

  @Prop()
  status: CUP_STATUS;

  @Prop()
  category: CONSTANT_CATEGORY;

  @Prop()
  created: number;
}

export const CupSchema = SchemaFactory.createForClass(Cup);
