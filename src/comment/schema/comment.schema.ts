import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop()
  _id: mongoose.Types.ObjectId;

  @Prop()
  _cupId: string;

  @Prop()
  comment: string;

  @Prop()
  nickname: string;

  @Prop()
  winnerName: string;

  @Prop()
  created: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
