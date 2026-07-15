import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
const Razorpay = require('razorpay');
import * as crypto from 'crypto';

@Injectable()
export class PaymentService {
  private razorpay: any;

  constructor() {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }

  async createOrder(amount: number, receipt: string = 'receipt#1') {
    const options = {
      amount: amount * 100, // amount in paise
      currency: 'INR',
      receipt,
    };
    try {
      const order = await this.razorpay.orders.create(options);
      return order;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  verifyPayment(razorpay_order_id: string, razorpay_payment_id: string, razorpay_signature: string) {
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      return { success: true };
    } else {
      return { success: false };
    }
  }
}
