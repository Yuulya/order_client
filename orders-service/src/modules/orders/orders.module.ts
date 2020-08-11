import { OrderController } from './orders.controller';
import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBModelNames } from '../../common/constants';
import { OrderSchema } from './orders.schema';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';
import { ApiPaymentsService } from '../external/api-payments.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
        {name: DBModelNames.Order, schema: OrderSchema},
    ])
  ],
  controllers: [OrderController],
  providers: [OrdersRepository, OrdersService, ApiPaymentsService],
})
export class OrdersModule {}
