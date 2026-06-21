import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';

@Injectable()
@Processor('whatsapp')
export class WhatsAppNotificationProcessor extends WorkerHost {
  async process(job: Job) {
    // TODO: integrate OneSender HTTP API using ONESENDER_BASE_URL and ONESENDER_API_KEY.
    return { delivered: false, queuedPayload: job.data };
  }
}
