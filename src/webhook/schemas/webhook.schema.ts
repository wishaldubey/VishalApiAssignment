import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type WebhookDataDocument = WebhookData & Document;

@Schema({ timestamps: true })
export class WebhookData {
  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  data: any;
}

export const WebhookDataSchema = SchemaFactory.createForClass(WebhookData);
