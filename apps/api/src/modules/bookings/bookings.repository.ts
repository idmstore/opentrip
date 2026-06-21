import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class BookingsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.BookingCreateInput) {
    return this.prisma.booking.create({ data, include: { participants: true, payment: true } });
  }

  findByCode(code: string) {
    return this.prisma.booking.findUnique({ where: { code }, include: { schedule: { include: { trip: true } }, participants: true, payment: true } });
  }
}
