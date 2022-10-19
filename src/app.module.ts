import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VersionController } from './version/version.controller';
import { CupController } from './cup/cup.controller';
import { CupModule } from './cup/cup.module';
import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';
import { CommentController } from './comment/comment.controller';
import { CommentModule } from './comment/comment.module';
import { SentryModule } from './sentry/sentry.module';
import '@sentry/tracing';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    SentryModule.forRoot({
      dsn: process.env.SENTRY_DNS,
      tracesSampleRate: 1.0,
      debug: Boolean(process.env.SENTRY_DNS_DEBUG) || true,
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URL || 'mongodb://localhost/realcup',
    ),
    AuthModule,
    UsersModule,
    CupModule,
    CategoryModule,
    CommentModule,
    SentryModule,
  ],
  controllers: [
    AppController,
    VersionController,
    CupController,
    CategoryController,
    CommentController,
  ],
  providers: [AppService],
})
export class AppModule {}
