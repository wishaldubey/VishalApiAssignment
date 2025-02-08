import {
  IsNotEmpty,
  IsString,
  IsUrl,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateCronJobDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  linkToTrigger: string;

  @IsString()
  @IsNotEmpty()
  apiKey: string;

  @IsString()
  @IsNotEmpty()
  schedule: string;

  @IsOptional()
  @IsDateString()
  startDate?: Date;
}
