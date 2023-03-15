import mongoose from "mongoose";

const schema = new mongoose.Schema({
  customerCode: {
    type: String,
    required: false,
  },
  customerName: {
    type: String,
    required: true,
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
  electricityList: [
    {
        invoiceId: {
            type: String,
            required: true,
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
        }
    }
  ],
});

export const CustomerModel = mongoose.model("Customer", schema);
