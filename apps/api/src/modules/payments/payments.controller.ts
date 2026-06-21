import { Body, Controller, Headers, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly payments: PaymentsService) {}

  @Post('tripay/callback')
  handleTripayCallback(@Body() payload: unknown, @Headers('x-callback-signature') signature?: string) {
    return this.payments.handleTripayCallback(payload, signature);
  }
}
