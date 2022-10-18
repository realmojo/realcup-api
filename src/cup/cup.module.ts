import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CupService } from './cup.service';
import { CupController } from './cup.controller';
import { Cup, CupSchema } from './schema/cup.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Cup.name, schema: CupSchema }]),
  ],
  providers: [CupService],
  exports: [CupService],
  controllers: [CupController],
})
export class CupModule {}
