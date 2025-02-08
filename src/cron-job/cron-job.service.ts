import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCronJobDto } from './dto/create-cron-job.dto';
import { UpdateCronJobDto } from './dto/update-cron-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CronJob, CronJobDocument } from './schemas/cron-job.schema';
import { Model } from 'mongoose';
import { CronJob as Cron } from 'cron';
import axios from 'axios';

@Injectable()
export class CronJobService {
  private readonly logger = new Logger(CronJobService.name);
  private jobs: { [name: string]: Cron } = {};

  constructor(
    @InjectModel(CronJob.name) private cronJobModel: Model<CronJobDocument>,
  ) {
    this.initializeCronJobs();
  }

  async create(createCronJobDto: CreateCronJobDto): Promise<CronJob> {
    const createdCronJob = new this.cronJobModel(createCronJobDto);
    const savedCronJob = await createdCronJob.save();
    this.addCronJob(savedCronJob);
    return savedCronJob;
  }

  async findAll(): Promise<CronJob[]> {
    return this.cronJobModel.find().exec();
  }

  async findOne(id: string): Promise<CronJob> {
    const cronJob = await this.cronJobModel.findById(id).exec();
    if (!cronJob) {
      throw new NotFoundException(`Cron job with ID "${id}" not found`);
    }
    return cronJob;
  }

  async update(
    id: string,
    updateCronJobDto: UpdateCronJobDto,
  ): Promise<CronJob> {
    const existingCronJob = await this.cronJobModel
      .findByIdAndUpdate(id, updateCronJobDto, { new: true })
      .exec();
    if (!existingCronJob) {
      throw new NotFoundException(`Cron job with ID "${id}" not found`);
    }

    if (updateCronJobDto.schedule) {
      this.removeCronJob(existingCronJob.name);
      this.addCronJob(existingCronJob);
    }

    return existingCronJob;
  }

  async remove(id: string): Promise<void> {
    const cronJobDoc = await this.cronJobModel.findById(id).exec();
    if (!cronJobDoc) {
      throw new NotFoundException(`Cron job with ID "${id}" not found`);
    }

    this.removeCronJob(cronJobDoc.name);
    await this.cronJobModel.findByIdAndDelete(id).exec();
  }

  async executeJob(cronJob: CronJobDocument): Promise<void> {
    this.logger.log(`Executing job: ${cronJob.name}`);
    try {
      const response = await axios.get(cronJob.linkToTrigger, {
        headers: {
          'x-api-key': cronJob.apiKey,
        },
      });
      this.logger.log(
        `Job ${cronJob.name} completed with status ${response.status}`,
      );
    } catch (error) {
      this.logger.error(`Job ${cronJob.name} failed: ${error.message}`);
    }
    cronJob.lastExecution = new Date();
    await cronJob.save();
  }

  addCronJob(cronJob: CronJobDocument): void {
    if (this.jobs[cronJob.name]) {
      this.logger.warn(`Cron job ${cronJob.name} already exists. Skipping.`);
      return;
    }

    const job = new Cron(
      cronJob.schedule,
      () => this.executeJob(cronJob),
      null,
      true,
      'America/Los_Angeles',
    );

    this.jobs[cronJob.name] = job;

    this.logger.log(
      `Job ${cronJob.name} added with schedule ${cronJob.schedule}`,
    );
  }

  removeCronJob(name: string): void {
    if (this.jobs[name]) {
      this.jobs[name].stop();
      delete this.jobs[name];
      this.logger.warn(`Job ${name} stopped and deleted!`);
    } else {
      this.logger.error(`Job ${name} not found!`);
    }
  }

  private async initializeCronJobs(): Promise<void> {
    const cronJobs = await this.cronJobModel.find().exec();
    cronJobs.forEach((cronJob) => this.addCronJob(cronJob));
  }
}
