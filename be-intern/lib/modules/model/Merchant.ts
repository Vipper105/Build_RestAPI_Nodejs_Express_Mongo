import {Document,Schema,Model,model,Error} from "mongoose";

export interface IMerchant extends Document{ }

// User of schema
const merchantSchema = new Schema({
  Name: String,
  Address: String,
  Location: Array,
  District: String,
  Phone: Number,
  State: String,
  OpeningHours: [
    {
      openAt: Number,
      closeAt: Number,
    },
    {
      openAt: Number,
      closeAt: Number,
    },
  ],
  imageUrl: String,

  Dish: [],
  createDate: { type: Date, default: Date.now },
});

export const Merchant: Model<IMerchant> = model<IMerchant>("merchant", merchantSchema);


