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
    const { _id } = param;
    const { title, description } = body;
    return await this.cupService.updateCup(_id, title, description);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:_id')
  async getCup(@Param() param): Promise<Cup> {
    const { _id } = param;
    return await this.cupService.getCup(_id);
  }
}
