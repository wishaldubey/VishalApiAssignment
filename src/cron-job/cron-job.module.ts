import { Module } from '@nestjs/common';
import { CronJobService } from './cron-job.service';
import { CronJobController } from './cron-job.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CronJob, CronJobSchema } from './schemas/cron-job.schema';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CronJob.name, schema: CronJobSchema }]),
    ScheduleModule,
  ],
  controllers: [CronJobController],
  providers: [CronJobService],
})
export class CronJobModule {}
