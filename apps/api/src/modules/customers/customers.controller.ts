import { Controller, Get, Header, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from '../../database/prisma.service';

@Controller('admin/customers')
export class CustomersController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  findAll() {
    return this.prisma.customer.findMany({ include: { bookings: true }, orderBy: { createdAt: 'desc' } });
  }

  @Get('export.csv')
  @Header('Content-Type', 'text/csv')
  async exportCsv(@Res() res: Response) {
    const customers = await this.prisma.customer.findMany({ include: { bookings: true } });
    const rows = ['name,whatsapp,email,total_bookings', ...customers.map((c) => `${c.name},${c.whatsapp},${c.email ?? ''},${c.bookings.length}`)];
    res.send(rows.join('\n'));
  }

  @Get(':id/history')
  history(@Param('id') id: string) {
    return this.prisma.booking.findMany({ where: { customerId: id }, include: { schedule: { include: { trip: true } }, payment: true } });
  }
}
