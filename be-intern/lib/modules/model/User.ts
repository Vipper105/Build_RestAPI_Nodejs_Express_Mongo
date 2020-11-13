import { Document, Schema, Model, model, Error } from "mongoose";
import * as Joi from "joi"; 
import passport = require("passport");

//const Joi = require("joi");

// user create new
export interface IUser extends Document {
  // ? :   an optional parameter. The Typescript compiler does not require this parameter to be filled in
  name: {
    first_name: String;
    middle_name: String;
    last_name: String;
  };
  password: String;
  email: String;
  phone_number: String;
  gender: String;
  is_deleted?: Boolean;
  date: Date;
}

// User of schema
export const userSchema = new Schema({
  name: {
    first_name: String,
    middle_name: String,
    last_name: String,
  },
  password: {
    type: String,
    required: `Please input your password`,
  },
  email: {
    type: String,
    required: `Please input email`,
  },
  phone_number: String,
  gender: String,
  is_deleted: {
    type: Boolean,
    default: false,
  },
  createDate: { type: Date, default: Date.now },
});

export const validateUser = (user: any) => {

  const schema = Joi.object({
    name: {
      first_name: Joi.string(),
      middle_name: Joi.string(),
      last_name: Joi.string(),
    },
    password: Joi.string().required(),
    email: Joi.string().min(6).max(255).email().required(),
    phone_number: Joi.string(),
    gender: Joi.string(),

  })
	return schema.validate(user);
} 
/*
userSchema.methods.sayHello = () => {
    const greeting = this.name.last_name ? "My name is " + this.name.last_name : "I don't have a name";
    console.log(greeting);
}
*/
export const User: Model<IUser> = model<IUser>("users", userSchema);
