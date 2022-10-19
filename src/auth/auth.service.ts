import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findOneByEmail(email);
      const match = bcrypt.compareSync(pass, user.password);
      if (user && match) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(param: any) {
    try {
      const user = await this.usersService.findOneByEmail(param.email);
      const match = bcrypt.compareSync(param.password, user.password);
      if (user && match) {
        const payload = {
          id: user._id,
          email: user.email,
          password: param.password,
        };
        return {
          userId: user._id,
          access_token: this.jwtService.sign(payload, {
            expiresIn: `${86400 * 7}s`,
          }),
        };
      } else {
        throw new BadRequestException(
          '아이디 혹은 비밀번호가 일치하지 않습니다.',
        );
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
