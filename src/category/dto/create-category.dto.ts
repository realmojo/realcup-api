import { IsNumber, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateCategoryDto {
  @IsString()
  readonly _id: mongoose.Types.ObjectId;

  @IsString()
  readonly title: string;

  @IsNumber()
  readonly sort: number;
}
