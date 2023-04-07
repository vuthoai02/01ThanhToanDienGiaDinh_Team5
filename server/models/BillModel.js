import mongoose from "mongoose";

const schema = new mongoose.Schema({
  customerCode: {
    type: String,
    require: false,
  },
  newIndicator: {
    type: Number,
    required: true,
    default: 0,
  },
  oldIndicator: {
    type: Number,
    required: true,
    default: 0,
  },
  hs: {
    type: Number,
    required: false,
    default: 1,
  },
  dntructiep: {
    type: Number,
    required: false,
    default: 0,
  },
  actualElectric: {
    type: Number,
    required: true,
    default: 0,
  },
  unitPrice: {
    type: Number,
    required: false,
    default: 2320,
  },
  VATRate: {
    type: Number,
    required: false,
    default: 10,
  },
  signinDate: {
    type: Date,
    required: true,
  },
  isPayment: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const BillModel = mongoose.model("Bill", schema);
