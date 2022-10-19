import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';

@Controller('version')
export class VersionController {
  @Get()
  async getVersion(): Promise<any> {
    try {
      return {
        version: '1.0',
        message: 'hi',
      };
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
