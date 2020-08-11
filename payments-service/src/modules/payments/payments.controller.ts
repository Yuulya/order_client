import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { ProcessOrderDto } from './payments.dto';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('payments')
@ApiTags('payments')
@UseGuards(AuthGuard)
export class PaymentController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('')
  @ApiBearerAuth()
  processOrder(@Body() data: ProcessOrderDto) {
    // mark payment status as created
    return this.paymentsService.processOrder(data);
  }
}
