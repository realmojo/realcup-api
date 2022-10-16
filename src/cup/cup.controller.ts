import {
  Controller,
  Request,
  Get,
  Patch,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CupService } from './cup.service';
import { Cup } from './schema/cup.schema';

@Controller('cup')
export class CupController {
  constructor(private readonly cupService: CupService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async addCup(@Body() body, @Request() req): Promise<Cup> {
    console.log('add cup');
    const { id } = req.user;
    return await this.cupService.addCup({ ...body, _userId: id });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:_id')
  async patchCup(@Param() param, @Body() body): Promise<Cup> {
    console.log('patch cup');
    const { _id } = param;
    return await this.cupService.patchCup(_id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:_id/status')
  async patchCupStatus(@Param() param, @Body() body): Promise<Cup> {
    console.log('patch cup status');
    const { _id } = param;
    const { status } = body;
    return await this.cupService.patchCupStatus(_id, status);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:_id/images')
  async patchCupImages(@Param() param, @Body() body): Promise<Cup> {
    console.log('patch cup images');
    const { _id } = param;
    const { images } = body;
    return await this.cupService.patchCupImages(_id, images);
  }

  @Patch('/:_id/images/:_imageId')
  async patchCupImageWinnerCount(@Param() param): Promise<Cup> {
    console.log('patchCupImageWinnerCount');
    const { _id, _imageId } = param;
    return await this.cupService.patchCupImageWinnerCount(_id, _imageId);
  }

  @Get('/list')
  async getCupList(@Query() query): Promise<Cup[] | []> {
    console.log('get cup list');
    const { category, page } = query;
    const params = {
      category: category || 'all',
      page: Number(page) || 1,
    };
    return await this.cupService.getCupList(params);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/myList')
  async getMyCupList(@Request() req): Promise<Cup[] | []> {
    console.log('get cup my list');
    const { id } = req.user;
    return await this.cupService.getMyCupList(id);
  }

  @Get('/:_id')
  async getCup(@Param() param, @Query() query): Promise<Cup> {
    console.log('get cup');
    const { _id } = param;
    const { isPlay } = query;

    if (isPlay) {
      await this.cupService.patchCupPlayCount(_id);
    }
    return await this.cupService.getCup(_id);
  }
}
