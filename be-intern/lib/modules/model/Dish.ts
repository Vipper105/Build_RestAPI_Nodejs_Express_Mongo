import {Document,Schema,Model,model,Error} from "mongoose";

export interface IDish extends Document{}

// User of schema
const dishSchema = new Schema({
  Name: String,
  Price: Number,
  Image: String,
  Description: String,
  Available: Boolean,
  createDate: { type: Date, default: Date.now },
});


export const Dish: Model<IDish> = model<IDish>("dish", dishSchema);



