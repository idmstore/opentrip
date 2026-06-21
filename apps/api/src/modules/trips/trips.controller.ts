import { Controller, Get, Param } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Controller('trips')
export class TripsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  findAll() {
    return this.prisma.trip.findMany({ where: { isActive: true }, include: { schedules: true }, orderBy: { createdAt: 'desc' } });
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.prisma.trip.findUnique({ where: { slug }, include: { schedules: true } });
  }
}
