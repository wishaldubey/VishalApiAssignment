import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WebhookData, WebhookDataSchema } from './schemas/webhook.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WebhookData.name, schema: WebhookDataSchema },
    ]),
  ],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {}
