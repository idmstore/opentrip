import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { BookingCodeService } from './booking-code.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService, private readonly codes: BookingCodeService) {}

  async create(dto: CreateBookingDto) {
    if (dto.participants.length !== dto.participantCount) {
      throw new BadRequestException('participantCount must match participants length');
    }

    const schedule = await this.prisma.tripSchedule.findUnique({ where: { id: dto.scheduleId } });
    if (!schedule || schedule.quota - schedule.bookedQuota < dto.participantCount) {
      throw new BadRequestException('Schedule not found or quota is not available');
    }

    return this.prisma.$transaction(async (tx) => {
      const customer = await tx.customer.upsert({
        where: { whatsapp_email: { whatsapp: dto.contactWhatsapp, email: dto.contactEmail ?? '' } },
        update: { name: dto.contactName },
        create: { name: dto.contactName, whatsapp: dto.contactWhatsapp, email: dto.contactEmail ?? '' }
      });

      const totalAmount = Number(schedule.price) * dto.participantCount;
      const booking = await tx.booking.create({
        data: {
          code: this.codes.generate(),
          customerId: customer.id,
          scheduleId: schedule.id,
          contactName: dto.contactName,
          contactWhatsapp: dto.contactWhatsapp,
          contactEmail: dto.contactEmail,
          participantCount: dto.participantCount,
          totalAmount,
          participants: { create: dto.participants },
          payment: { create: { amount: totalAmount } }
        },
        include: { participants: true, payment: true }
      });
      await tx.tripSchedule.update({ where: { id: schedule.id }, data: { bookedQuota: { increment: dto.participantCount } } });
      return booking;
    });
  }

  findByCode(code: string) {
    return this.prisma.booking.findUnique({ where: { code }, include: { schedule: { include: { trip: true } }, participants: true, payment: true } });
  }
}
