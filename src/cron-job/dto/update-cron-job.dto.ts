import { PartialType } from '@nestjs/mapped-types';
import { CreateCronJobDto } from './create-cron-job.dto';
import { IsOptional, IsString, IsUrl, IsDateString } from 'class-validator';

export class UpdateCronJobDto extends PartialType(CreateCronJobDto) {
  @IsOptional()
  @IsString()
  @IsUrl()
  linkToTrigger?: string;

  @IsOptional()
  @IsString()
  apiKey?: string;

  @IsOptional()
  @IsString()
  schedule?: string;

  @IsOptional()
  @IsDateString()
  startDate?: Date;
}
