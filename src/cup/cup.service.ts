import mongoose, { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cup, CupDocument } from './schema/cup.schema';
import { CreateCupDto } from './dto/create-cup.dto';
import { CUP_STATUS } from './schema/constant';

@Injectable()
export class CupService {
  constructor(@InjectModel(Cup.name) private cupModel: Model<CupDocument>) {}

  async findOne(_id: string): Promise<Cup | undefined> {
    return await this.cupModel.findOne({
      _id: new mongoose.Types.ObjectId(_id),
    });
  }

  async findOneByTitle(title: string): Promise<Cup | undefined> {
    return await this.cupModel.findOne({
      title,
    });
  }

  async getCup(_id: string): Promise<Cup | undefined> {
    const cup = await this.findOne(_id);
    return cup;
  }

  async addCup(createCupDto: CreateCupDto): Promise<Cup | undefined> {
    const Cup = await this.findOneByTitle(createCupDto.title);
    if (Cup === null) {
      const params = {
        _id: new mongoose.Types.ObjectId(),
        title: createCupDto.title,
        description: createCupDto.description,
        active: CUP_STATUS.ACTIVE,
        playCount: 0,
        created: new Date().getTime(),
      };

      const createCup = new this.cupModel(params);
      const data = await createCup.save();
      return data;
    } else {
      throw new BadRequestException('이미 등록된 제목 입니다.');
    }
  }

  async updateCup(
    _id: string,
    title: string,
    description: string,
  ): Promise<Cup | undefined> {
    const filter = {
      _id: new mongoose.Types.ObjectId(_id),
    };
    const set = { title, description };
    const d = await this.cupModel.findOneAndUpdate(filter, set, {
      new: true,
    });
    console.log(d);
    return await this.cupModel.findOneAndUpdate(filter, set, {
      new: true,
    });
  }

  async removeCup(_id: string): Promise<Cup | undefined> {
    const filter = {
      _id: new mongoose.Types.ObjectId(_id),
    };
    const set = {
      $set: { active: CUP_STATUS.DELETE },
    };
    return await this.cupModel.findByIdAndUpdate(filter, set, { new: true });
  }
}
