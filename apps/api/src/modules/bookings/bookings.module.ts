import { Module } from '@nestjs/common';
import { BookingCodeService } from './booking-code.service';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';

@Module({ controllers: [BookingsController], providers: [BookingsService, BookingCodeService], exports: [BookingsService] })
export class BookingsModule {}
