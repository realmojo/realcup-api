import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
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
  @Post('/:_id')
  async updateCup(@Param() param, @Body() body): Promise<Cup> {
    console.log('update cup');
    const { _id } = param;
    return await this.cupService.updateCup(_id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:_id')
  async getCup(@Param() param): Promise<Cup> {
    console.log('get cup');
    const { _id } = param;
    return await this.cupService.getCup(_id);
  }
}
