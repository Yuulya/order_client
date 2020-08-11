import { BaseDocument } from '../../common/mongoose';

export interface IOrder extends BaseDocument {
  userId: string;
  status: string;
  details: any;
  createdAt: string;
  updatedAt: string;
}
