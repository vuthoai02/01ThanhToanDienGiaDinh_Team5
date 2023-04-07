import mongoose from "mongoose";

const schema = new mongoose.Schema({
  customerCode: {
    type: String,
    require: false,
  },
  customerName: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  meterSeries: {
    type: String,
    required: true,
  },
  houseHold: {
    type: Number,
    required: false,
    default: 0,
  },
  paymentCode: {
    type: String,
    required: true,
  },
  businessCode: {
    type: String,
    required: false,
  },
  teamCode: {
    type: Number,
    required: true,
  },
  stationCode: {
    type: String,
    required: true,
  },
  voltage: {
    type: Number,
    required: false,
    default: 1
  },
  indicatorRecordDate: {
    type: Number,
    required: false,
    default: 28,
  },
  businessChargeCode: {
    type: String,
    require: false,
    default: '100%*2320-KDDV-A',
  },
  taxCode: {
    type: String,
    required: true,
  },
});

export const CustomerModel = mongoose.model("Customer", schema);
