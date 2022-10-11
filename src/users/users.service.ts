import mongoose, { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
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
    const user = await this.findOneByEmail(email);

    return user;
  }

  async getUser(_id: string): Promise<any | undefined> {
    const user = await this.findOne(_id);
    return {
      _id: user._id,
      email: user.email,
    };
  }

  async addUser(createUserDto: CreateUserDto): Promise<User | undefined> {
    const User = await this.findOneByEmail(createUserDto.email);
    if (User === null) {
      const params = {
        _id: new mongoose.Types.ObjectId(),
        email: createUserDto.email,
        password: bcrypt.hashSync(createUserDto.password, 10),
        active: USER_STATUS.ACTIVE,
        created: new Date().getTime(),
      };
      const createUser = new this.userModel(params);
      await createUser.save();
      return await this.findOne(createUser._id);
    } else {
      throw new BadRequestException('이미 등록된 사용자 입니다.');
    }
  }
}
