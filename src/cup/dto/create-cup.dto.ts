import { IsNumber, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateCupDto {
  @IsString()
  readonly _id: mongoose.Types.ObjectId;

  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly category: string;

  @IsNumber()
  readonly playCount: number;

  @IsNumber()
  readonly images: object;

  @IsString()
  readonly status: string;

  @IsNumber()
  readonly created: number;
}
