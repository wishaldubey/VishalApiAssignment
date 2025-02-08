import {
  Controller,
  Post,
  Body,
  Get,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { RateLimit } from 'nestjs-rate-limiter';

@Controller('webhooks')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  @RateLimit({ points: 10, duration: 60 })
  @UsePipes(new ValidationPipe({ transform: true }))
  async receiveWebhook(@Body() data: any) {
    try {
      return await this.webhookService.receiveWebhook(data);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Failed to receive webhook: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @RateLimit({ points: 10, duration: 60 })
  async getAllWebhooks() {
    try {
      return await this.webhookService.getAllWebhooks();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Failed to get webhooks: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
