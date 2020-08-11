import { Schema } from 'mongoose';
import { IOrder } from './orders.common';

export const OrderSchema = new Schema<IOrder>(
  {
    userId: {
      type: String,
    },
    status: {
      type: String,
    },
    details: {
      type: Object,
    },
    _deleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
  },
  {
    timestamps: true,
  },
);
