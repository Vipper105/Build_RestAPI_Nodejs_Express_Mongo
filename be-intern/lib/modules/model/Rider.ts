import {Document,Schema,Model,model,Error} from "mongoose";

export interface IRider extends Document { 

}


var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

export const riderSchema = new Schema({
  name: {
    first_name: String,
    middle_name: String,
    last_name: String,
  },

  email: {
    type: String,
    trim: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    //match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  Phone: {
    type: Number,
    minlength: 7,
    maxlength: 10,
  },
  Age: Number,
  Gender: String,
  Address: String,
  Status: Boolean,
  JoinDate: {
    type: Date,
    default: Date.now,
  },
  cardID: String,
  location: {
    longtitude: Number,
    latitude: Number
  }
});

export const Rider: Model<IRider> = model<IRider>("rider", riderSchema);
