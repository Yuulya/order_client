import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../../common/mongoose';
import { IOrder } from './orders.common';
import { DBModelNames } from '../../common/constants';

@Injectable()
export class OrdersRepository extends BaseRepository<IOrder> implements OnApplicationBootstrap {
  constructor(@InjectModel(DBModelNames.Order) model: Model<IOrder>) {
    super(model);
  }

  async onApplicationBootstrap(): Promise<void> {
    await this.createCollectionIfNotExited();
  }

}