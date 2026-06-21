import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { WhatsAppNotificationProcessor } from './notifications.processor';
@Module({ imports: [BullModule.registerQueue({ name: 'whatsapp' })], providers: [NotificationsService, WhatsAppNotificationProcessor], exports: [NotificationsService] })
export class NotificationsModule {}
