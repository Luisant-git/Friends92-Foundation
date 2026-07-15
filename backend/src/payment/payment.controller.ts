import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-order')
  async createOrder(@Body() data: { amount: number; receipt?: string }) {
    return this.paymentService.createOrder(data.amount, data.receipt);
  }

  @Post('verify')
  verifyPayment(@Body() data: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) {
    const result = this.paymentService.verifyPayment(data.razorpay_order_id, data.razorpay_payment_id, data.razorpay_signature);
    if (!result.success) {
      return { status: 'failure' };
    }
    return { status: 'success' };
  }
}
