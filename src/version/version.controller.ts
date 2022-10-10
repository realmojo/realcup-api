import { Controller, Get } from '@nestjs/common';

@Controller('version')
export class VersionController {
  @Get()
  async getVersion(): Promise<any> {
    return {
      version: '1.0',
      message: 'hi',
    };
  }
}
