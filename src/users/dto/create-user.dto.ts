import { IsNumber, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateUserDto {
  @IsString()
  readonly _id: mongoose.Types.ObjectId;

  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly status: string;

  @IsNumber()
  readonly created: number;
}
