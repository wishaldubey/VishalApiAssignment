import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WebhookData, WebhookDataDocument } from './schemas/webhook.schema';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(
    @InjectModel(WebhookData.name)
    private webhookDataModel: Model<WebhookDataDocument>,
  ) {}

  async receiveWebhook(data: any): Promise<WebhookData> {
    this.logger.log('Received webhook data:', data);
    const createdWebhookData = new this.webhookDataModel({ data });
    return createdWebhookData.save();
  }

  async getAllWebhooks(): Promise<WebhookData[]> {
    return this.webhookDataModel.find().exec();
  }
}
