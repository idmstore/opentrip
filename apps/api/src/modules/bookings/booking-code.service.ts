import { Injectable } from '@nestjs/common';

@Injectable()
export class BookingCodeService {
  generate(date = new Date()) {
    const stamp = date.toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.random().toString(36).slice(2, 8).toUpperCase();
    return `OT-${stamp}-${random}`;
  }
}
