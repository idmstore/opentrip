import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookings: BookingsService) {}

  @Post()
  create(@Body() dto: CreateBookingDto) {
    return this.bookings.create(dto);
  }

  @Get(':code')
  findByCode(@Param('code') code: string) {
    return this.bookings.findByCode(code);
  }
}
