import { Controller, Get, Query } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Controller('trip-schedules')
export class SchedulesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  findAll(@Query('tripId') tripId?: string) {
    return this.prisma.tripSchedule.findMany({ where: { tripId }, include: { trip: true }, orderBy: { startDate: 'asc' } });
  }
}
