import { Injectable } from '@nestjs/common';
import { IPayment } from './payments.common';
import {ObjectId} from 'bson';
import { ProcessOrderDto } from './payments.dto';

@Injectable()
export class PaymentsService {
  async processOrder(data: ProcessOrderDto) {
    // call to api-payment
    const value = Math.random() * 100;
    if (value < 25) {
      return 'DECLINED'
    }
    return 'CONFIRMED';
  }
}
