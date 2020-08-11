import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { IOrder } from './orders.common';
import {ObjectId} from 'bson';
import { ApiPaymentsService } from '../external/api-payments.service';
import { access } from 'fs';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository,
              private readonly apiPaymentsService: ApiPaymentsService) {}

  // create an order and trigger call to payments api
  async createOrder(userId: string, orderData: Partial<IOrder>) {
    const createdOrder = await this.ordersRepository.create({
      userId,
      status: 'CREATED',
      details: orderData.details
    });

    // trigger to call to api-payment
    this.apiPaymentsService.processOrder(createdOrder).then(paymentStatus => {
      if (paymentStatus === 'DECLINED') {
        this._updateOrderStatus(createdOrder._id.toString(), 'CANCELED').then();
      } else {
        this._updateOrderStatus(createdOrder._id.toString(), 'CONFIRMED').then(res => {
          setTimeout(() => {
            this._setOrderDelivered(createdOrder._id.toString()).then().catch(e => {console.log(e)})
          }, 10000)
        });
      }
    });

    return createdOrder;
  }

  async cancelOrder(orderId: string) {
    await this.ordersRepository.updateOne({
      _id: ObjectId.createFromHexString(orderId)
    }, {
      status: 'CANCELED',
    });

    const updatedOrder = await this.ordersRepository.findOne({
      _id: ObjectId.createFromHexString(orderId)
    });

    return updatedOrder;
  }

  async findOrderDetail(orderId: string) {
    const updatedOrder = await this.ordersRepository.findOne({
      _id: ObjectId.createFromHexString(orderId)
    });

    if (!updatedOrder) {
      throw new Error(`Cannot find this order ${orderId}`);
    }
    return updatedOrder;
  }

  // find all orders of an user
  async findUserOrders(userId) {
    return this.ordersRepository.find({userId});
  }

  // update order status
  async _updateOrderStatus(orderId: string, orderStatus: string) {
    await this.ordersRepository.updateOne({
      _id: ObjectId.createFromHexString(orderId)
    }, {
      status: orderStatus,
    });
  }

  // set order as delivered if its status is CONFIRMED
  async _setOrderDelivered(orderId: string) {
    const order = await this.ordersRepository.findOne({
      _id: ObjectId.createFromHexString(orderId)
    });

    if (order.status === 'CONFIRMED') {
      this._updateOrderStatus(orderId, 'DELIVERED')
    }
  }
}
