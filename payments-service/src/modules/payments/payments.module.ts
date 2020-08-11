import { PaymentController } from './payments.controller';
import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
