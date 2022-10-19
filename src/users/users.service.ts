import mongoose, { Model } from 'mongoose';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { USER_STATUS } from './schema/constant';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(_id: string): Promise<User | undefined> {
    return await this.userModel.findOne({
      _id: new mongoose.Types.ObjectId(_id),
    });
  }
  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.userModel.findOne({ email });
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await this.findOneByEmail(email);
      return user;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUser(_id: string): Promise<any | undefined> {
    try {
      const user = await this.findOne(_id);
      return {
        _id: user._id,
        email: user.email,
      };
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addUser(createUserDto: CreateUserDto): Promise<User | undefined> {
    try {
      const User = await this.findOneByEmail(createUserDto.email);
      if (User === null) {
        const params = {
          _id: new mongoose.Types.ObjectId(),
          email: createUserDto.email,
          password: bcrypt.hashSync(createUserDto.password, 10),
          created: new Date().getTime(),
        };
        const createUser = new this.userModel(params);
        await createUser.save();
        return await this.findOne(createUser._id);
      } else {
        throw new BadRequestException('이미 등록된 사용자 입니다.');
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
