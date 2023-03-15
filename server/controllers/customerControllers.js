import { CustomerModel } from "../models/CustomerModel.js";

export const getCustomer = async (req, res) => {
  const customerCode = req.query.customerCode;
  try {
    const customer = await CustomerModel.findOne(customerCode);
    return res.status(200).json({
      success: true,
      message: "Lấy thông tin thành công",
      data: customer,
    });
  } catch (error) {
    console.log(err);
    res
      .status(400)
      .json({ success: false, message: "Lấy thông tin không thành công!" });
  }
};

export const getBill = async (req, res) => {
  const { customerCode, invoiceId } = req.query.data;
  try {
    const customer = await CustomerModel.findOne(customerCode);
    if (customer) {
      const bill = customer.electricityList.filter(
        (elm) => elm.invoiceId == invoiceId
      )[0];
      return bill
        ? res.status(200).json({
            success: true,
            message: "Lấy thông tin thành công",
            data: bill,
          })
        : res.status(400).json({
            success: false,
            message: "Lấy thông tin không thành công!",
          });
    }
  } catch (error) {
    console.log(err);
    res
      .status(400)
      .json({ success: false, message: "Lấy thông tin không thành công!" });
  }
};

export const payment = async (req, res) => {
  const { customerCode, invoiceId } = req.query.data;
  try {
    const customer = await CustomerModel.findOne(customerCode);
    if (customer) {
      const bill = customer.electricityList.filter(
        (elm) => elm.invoiceId == invoiceId
      )[0];
      const newStateBill = { ...bill, isPayment: true };
      await customer.updateOne({
        ...customer,
        electricityList: [
          ...customer.electricityList.filter(
            (elm) => elm.invoiceId != invoiceId
          ),
          newStateBill,
        ],
      });
      res.status(200).json({ success: true, message: "Thanh toán thành công" });
    }
  } catch (error) {
    console.log(err);
    res
      .status(400)
      .json({ success: false, message: "Thanh toán không thành công!" });
  }
};
