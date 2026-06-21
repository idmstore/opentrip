import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(@InjectQueue('whatsapp') private readonly queue: Queue, private readonly prisma: PrismaService) {}

  async queueWhatsApp(recipient: string, template: string, payload: Record<string, unknown>) {
    const log = await this.prisma.notificationLog.create({ data: { channel: 'whatsapp', recipient, template, payload } });
    await this.queue.add(template, { logId: log.id, recipient, payload });
    return log;
  }
}
