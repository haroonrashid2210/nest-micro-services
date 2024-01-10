import { CONSTANT, ENV } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Stripe } from 'stripe';
import { PaymentsCreateChargeDto } from './dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(ENV.STRIPE_SECRET_KEY);

  constructor(@Inject(CONSTANT.SERVICE.NOTIFICATIONS) private readonly notificationsService: ClientProxy) {}

  async createCharge({ amount, email }: PaymentsCreateChargeDto) {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card: { token: 'tok_visa' },
    });

    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: amount * 100,
      currency: 'usd',
      confirm: true,
      payment_method_types: ['card'],
    });

    this.notificationsService.emit('notify_email', { email });

    return paymentIntent;
  }
}
