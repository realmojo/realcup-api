import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
// import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import * as moment from 'moment';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() body) {
    return this.authService.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('throw')
  doThrow(@Request() req, @Query() query) {
    const { err } = query;
    try {
      if (err) {
        throw `${new Date().getTime()} / ${moment().format(
          'YYYY-MM-DD HH:mm:ss',
        )} / Error test`;
      }
      return req.user;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
