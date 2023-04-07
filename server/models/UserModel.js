import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Boolean,
    default: false,
    required: false
  },
  customerCode: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
});

export const UserModel = mongoose.model("User", schema);
