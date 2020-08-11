import { BaseDocument } from '../../common/mongoose';

export interface IPayment extends BaseDocument {
  userId: string;
  status: string;
  details: any;
  createdAt: string;
  updatedAt: string;
}
