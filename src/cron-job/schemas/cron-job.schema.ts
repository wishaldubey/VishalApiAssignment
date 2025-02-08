import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CronJobDocument = CronJob & Document;

@Schema({ timestamps: true })
export class CronJob {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  linkToTrigger: string;

  @Prop({ required: true })
  apiKey: string;

  @Prop({ required: true })
  schedule: string;

  @Prop()
  startDate: Date;

  @Prop()
  lastExecution: Date;
}

export const CronJobSchema = SchemaFactory.createForClass(CronJob);
