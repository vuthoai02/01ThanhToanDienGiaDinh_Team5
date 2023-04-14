import { CustomerModel } from "../models/CustomerModel.js";
import { BillModel } from "../models/BillModel.js";

export const getCustomer = async (req, res) => {
  const customerCode = req.query.customerCode;
  try {
    const customer = await CustomerModel.findOne({
      customerCode: customerCode,
    });
    return res.status(200).json({
      success: true,
      message: "Lấy thông tin thành công",
      data: customer,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Lấy thông tin không thành công!" });
  }
};

export const getBillsByCustomerCode= async (req, res) => {
  const customerCode = req.query.customerCode;
  try {
    const bills = await BillModel.find({ customerCode: customerCode });
    if(bills.length === 0){
      return res.status(400).json({
        success: false,
        message: "Không có mã người dùng này",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Lấy thông tin thành công",
      data: bills,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Lấy thông tin không thành công!" });
  }
};

export const payment = async (req, res) => {
  try {
      await BillModel.findByIdAndUpdate(req.body.id, {isPayment: true});
      res.status(200).json({ success: true, message: "Thanh toán thành công" });
  } catch (error) {
    console.log(err);
    res
      .status(400)
      .json({ success: false, message: "Thanh toán không thành công!" });
  }
};
