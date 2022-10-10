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
import { UsersService } from './users.service';
import { User } from './schema/users.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async addUser(@Body() body): Promise<User> {
    return await this.userService.addUser(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:_id')
  async getUser(@Param() param): Promise<User> {
    const { _id } = param;
    return await this.userService.getUser(_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getOwn(@Request() req): Promise<User> {
    const { id } = req.user; // id, email
    return await this.userService.getUser(id);
  }

  @Get('/:email')
  async getUserByEmail(@Param() param): Promise<User> {
    console.log('get user');
    const { email } = param;
    return await this.userService.getUserByEmail(email);
  }
}
