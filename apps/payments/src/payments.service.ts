import { CreateChargeDto, ENV } from '@app/common';
import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(ENV.STRIPE_SECRET_KEY);

  async createCharge({ card, amount }: CreateChargeDto) {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card,
    });

    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: amount * 100,
      currency: 'usd',
      confirm: true,
      payment_method_types: ['card'],
    });

    return paymentIntent;
  }
}
