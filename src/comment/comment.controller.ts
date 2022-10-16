import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './schema/comment.schema';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async addComment(@Body() body): Promise<Comment> {
    return await this.commentService.addComment(body);
  }

  @Get('/list')
  async getCommentList(@Query() query): Promise<Comment[] | []> {
    console.log('getCommentList');
    const { _cupId, page } = query;
    const params = {
      _cupId,
      page: Number(page) || 1,
    };
    return await this.commentService.getCommentList(params);
  }
}
