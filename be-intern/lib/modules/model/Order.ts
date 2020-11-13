import {Document,Schema,Model,model,Error} from "mongoose";

export interface IOrder extends Document{
  merchantId: String,
  merchantName: String,
  status: {
    type: Boolean,
    default: false,
  },
  toAddress: String,
  toLocation: [Number,Number],

  fromAddress: String,
  fromLocation: [Number,Number],
  distance: Number,
  Dish: [String],
  User: {},
  createDate:Date,
}

// User of schema
export const orderSchema = new Schema({
  merchantId: String,
  merchantName: String,
  status: {
    type: Boolean,
    default: false,
  },
  toAddress: String,
  toLocation: [Number,Number],

  fromAddress: String,
  fromLocation: [Number,Number],
  distance: Number,
  Dish: [String],
  User: {},
  createDate: { type: Date, default: Date.now },
});

export const Order: Model<IOrder> = model<IOrder>("order", orderSchema);