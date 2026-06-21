import { Injectable } from '@nestjs/common';
import { PaymentStatus } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async handleTripayCallback(payload: any, signature?: string) {
    const status = this.mapTripayStatus(payload?.status);
    const providerReference = payload?.reference;
    if (!providerReference) return { received: true, ignored: true };

    await this.prisma.payment.updateMany({
      where: { providerReference },
      data: { status, rawCallbackPayload: payload, paidAt: status === 'paid' ? new Date() : undefined }
    });
    return { received: true, signaturePresent: Boolean(signature) };
  }

  private mapTripayStatus(status?: string): PaymentStatus {
    if (status === 'PAID') return 'paid';
    if (status === 'EXPIRED') return 'expired';
    if (status === 'FAILED') return 'failed';
    return 'pending';
  }
}
