import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CronJobModule } from './cron-job/cron-job.module';
import { ScheduleModule } from '@nestjs/schedule';
import { RateLimiterModule, RateLimiterGuard } from 'nestjs-rate-limiter';
import { APP_GUARD } from '@nestjs/core';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule available everywhere
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI ||
        (() => {
          throw new Error('MONGODB_URI is not defined in .env file');
        })(),
    ),
    ScheduleModule.forRoot(),
    RateLimiterModule.register({
      points: Number(process.env.RATE_LIMIT),
      duration: Number(process.env.RATE_LIMIT_TTL),
    }),
    CronJobModule,
    WebhookModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RateLimiterGuard,
    },
  ],
})
export class AppModule {}
