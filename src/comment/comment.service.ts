import mongoose, { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './schema/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async findOne(_id: string): Promise<Comment | undefined> {
    return await this.commentModel.findOne({
      _id: new mongoose.Types.ObjectId(_id),
    });
  }

  async getCommentList({ _cupId, page }): Promise<Comment[] | undefined> {
    try {
      const limit = 3;
      const skip = limit * (page - 1);
      return await this.commentModel
        .find({ _cupId })
        .sort({ created: -1 })
        .skip(skip)
        .limit(limit);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addComment(
    createCommentDto: CreateCommentDto,
  ): Promise<Comment | undefined> {
    try {
      const { _cupId, comment, nickname, winnerName } = createCommentDto;
      const params = {
        _id: new mongoose.Types.ObjectId(),
        _cupId,
        comment,
        nickname,
        winnerName,
        created: new Date().getTime(),
      };

      const createComment = new this.commentModel(params);
      const data = await createComment.save();
      return data;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
