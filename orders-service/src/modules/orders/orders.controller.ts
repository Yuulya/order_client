import { Controller, Post, Get, Body, Delete, Param, UseGuards } from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './order.dto';
import { PinTokenGuard } from '../../guards/pinToken.guard';

@Controller('orders')
@ApiTags('orders')
@UseGuards(PinTokenGuard)
export class OrderController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('')
  createOrder(@Body() data: CreateOrderDto) {
    // mark order status as created
    return this.ordersService.createOrder('mockUserId', data);
  }

  @Delete('/:orderId')
  cancelOrder(@Param('orderId') orderId: string) {
    // mark order status as canceled
    return this.ordersService.cancelOrder(orderId);
  }

  @Get('/:orderId')
  getOrderDetails(@Param('orderId') orderId: string) {
    return this.ordersService.findOrderDetail(orderId);
  }

  @Get('')
  getOrderList() {
    return this.ordersService.findUserOrders('mockUserId');
  }
}
