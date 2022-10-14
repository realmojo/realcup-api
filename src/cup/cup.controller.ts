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
  async addCup(@Body() body): Promise<Cup> {
    console.log('add cup');
    return await this.cupService.addCup(body);
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

  // @UseGuards(JwtAuthGuard)
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

  // @UseGuards(JwtAuthGuard)
  @Get('/:_id')
  async getCup(@Param() param): Promise<Cup> {
    console.log('get cup');
    const { _id } = param;
    await this.cupService.patchCupPlayCount(_id);
    return await this.cupService.getCup(_id);
  }
}
