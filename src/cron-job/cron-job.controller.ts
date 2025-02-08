import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CronJobService } from './cron-job.service';
import { CreateCronJobDto } from './dto/create-cron-job.dto';
import { UpdateCronJobDto } from './dto/update-cron-job.dto';
import { RateLimit } from 'nestjs-rate-limiter';

@Controller('cron-jobs')
export class CronJobController {
  constructor(private readonly cronJobService: CronJobService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @RateLimit({ points: 5, duration: 60 })
  async create(@Body() createCronJobDto: CreateCronJobDto) {
    try {
      return await this.cronJobService.create(createCronJobDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Failed to create cron job: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @RateLimit({ points: 10, duration: 60 })
  async findAll() {
    try {
      return await this.cronJobService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Failed to get cron jobs: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @RateLimit({ points: 10, duration: 60 })
  async findOne(@Param('id') id: string) {
    try {
      return await this.cronJobService.findOne(id);
    } catch (error) {
      if (error.message.includes('not found')) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Failed to get cron job: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @RateLimit({ points: 5, duration: 60 })
  async update(
    @Param('id') id: string,
    @Body() updateCronJobDto: UpdateCronJobDto,
  ) {
    try {
      return await this.cronJobService.update(id, updateCronJobDto);
    } catch (error) {
      if (error.message.includes('not found')) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Failed to update cron job: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @RateLimit({ points: 5, duration: 60 })
  async remove(@Param('id') id: string) {
    try {
      await this.cronJobService.remove(id);
      return { message: 'Cron job deleted' };
    } catch (error) {
      if (error.message.includes('not found')) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Failed to delete cron job: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
