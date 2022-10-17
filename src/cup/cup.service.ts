import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
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

  async getCupList({ category, page }): Promise<Cup[] | undefined> {
    const limit = 10;
    const skip = limit * (page - 1);
    if (category === 'all') {
      return await this.cupModel
        .find({ status: CUP_STATUS.ACTIVE })
        .sort({ playCount: -1 })
        .skip(skip)
        .limit(limit);
    } else {
      return await this.cupModel
        .find({ category, status: CUP_STATUS.ACTIVE })
        .sort({ playCount: -1 })
        .skip(skip)
        .limit(limit);
    }
  }

  async getMyCupList(_userId): Promise<Cup[] | undefined> {
    return await this.cupModel.find({ _userId }).sort({ created: -1 });
  }

  async addCup(createCupDto: CreateCupDto): Promise<Cup | undefined> {
    // const Cup = await this.findOneByTitle(createCupDto.title);
    // if (Cup === null) {
    const params = {
      _id: new mongoose.Types.ObjectId(),
      _userId: createCupDto._userId,
      title: createCupDto.title,
      description: createCupDto.description,
      category: createCupDto.category,
      created: new Date().getTime(),
    };

    const createCup = new this.cupModel(params);
    const data = await createCup.save();
    return data;
    // } else {
    //   throw new BadRequestException('이미 등록된 제목 입니다.');
    // }
  }

  async patchCup(
    _id: string,
    body: { title: string; description: string; category: string },
  ): Promise<Cup | undefined> {
    const filter = {
      _id: new mongoose.Types.ObjectId(_id),
    };
    const { title, description, category } = body;
    const set = {
      title,
      description,
      category,
    };
    return await this.cupModel.findOneAndUpdate(filter, set, {
      new: true,
    });
  }

  async patchCupPlayCount(_id: string): Promise<Cup | undefined> {
    const filter = {
      _id: new mongoose.Types.ObjectId(_id),
    };

    const set = {
      $inc: {
        playCount: 1,
      },
      // playCount: ++item.playCount,
    };

    return await this.cupModel.findOneAndUpdate(filter, set, {
      new: true,
    });
  }

  async patchCupStatus(_id: string, status: string): Promise<Cup | undefined> {
    const filter = {
      _id: new mongoose.Types.ObjectId(_id),
    };
    const set = {
      status,
    };
    return await this.cupModel.findOneAndUpdate(filter, set, {
      new: true,
    });
  }

  async patchCupImages(_id: string, images: object): Promise<Cup | undefined> {
    const filter = {
      _id: new mongoose.Types.ObjectId(_id),
    };
    const set = {
      images,
    };
    return await this.cupModel.findOneAndUpdate(filter, set, {
      new: true,
    });
  }

  async patchCupImageWinnerCount(
    _id: string,
    _imageId: string,
  ): Promise<Cup | undefined> {
    const item = await this.getCup(_id);

    const filter = {
      _id: new mongoose.Types.ObjectId(_id),
    };

    const index = item.images.findIndex((imageItem) => {
      return imageItem._id === _imageId;
    });
    item.images[index].winnerCount += 1;

    const set = {
      images: item.images,
    };

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
