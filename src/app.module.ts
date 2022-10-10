import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VersionController } from './version/version.controller';
import { CupController } from './cup/cup.controller';
import { CupModule } from './cup/cup.module';

const mongodbURL = process.env.mongodbURL || 'mongodb://localhost/realcup';
console.log(`mongodb connect url: ${mongodbURL}`);

@Module({
  imports: [
    MongooseModule.forRoot(mongodbURL),
    AuthModule,
    UsersModule,
    CupModule,
  ],
  controllers: [AppController, VersionController, CupController],
  providers: [AppService],
})
export class AppModule {}
