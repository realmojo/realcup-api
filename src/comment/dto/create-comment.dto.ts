import { IsNumber, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateCommentDto {
  @IsString()
  readonly _id: mongoose.Types.ObjectId;

  @IsString()
  readonly _cupId: string;

  @IsString()
  readonly comment: string;

  @IsString()
  readonly nickname: string;

  @IsString()
  readonly winnerName: string;

  @IsNumber()
  readonly created: number;
}
