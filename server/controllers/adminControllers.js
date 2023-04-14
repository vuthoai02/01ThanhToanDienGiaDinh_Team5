import { UserModel } from "../models/UserModel.js";
import { CustomerModel } from "../models/CustomerModel.js";
import { BillModel } from "../models/BillModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const usersList = await UserModel.find();
    return res.status(200).json({
      success: true,
      message: "Lấy thông tin thành công",
      data: usersList,
    });
  } catch (error) {
    console.log(err);
    res
      .status(400)
      .json({ success: false, message: "Lấy thông tin không thành công!" });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const customersList = await CustomerModel.find();
    return res.status(200).json({
      success: true,
      message: "Lấy thông tin thành công",
      data: customersList,
    });
  } catch (error) {
    console.log(err);
    res
      .status(400)
      .json({ success: false, message: "Lấy thông tin không thành công!" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await UserModel.deleteOne({ id: req.query.id })
      .then(() => console.log("Success"))
      .catch((err) => console.log(err));
    return res.status(200).json({
      success: true,
      message: "Xóa thành công!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Xóa không thành công!" });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    CustomerModel.deleteOne({ id: req.query.id })
      .then(() => console.log("Success"))
      .catch((err) => console.log(err));
    return res.status(200).json({
      success: true,
      message: "Xóa thành công!",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Xóa không thành công!" });
  }
};

export const createCustomer = async (req, res) => {
  const customer = req.body;
  if (!customer) {
    return res
      .status(400)
      .json({ success: false, message: "Thêm khách hàng không thành công!" });
  }
  try {
    const existCustomer = await CustomerModel.findOne({
      customerCode: customer.customerCode,
    });
    console.log(existCustomer);
    if (existCustomer) {
      return res
        .status(400)
        .json({ success: false, message: "Thông tin khách hàng đã tồn tại!" });
    }
    const newCustomer = new CustomerModel(customer);
    newCustomer.save();
    res.status(200).json({
      success: true,
      message: "Thêm thành công!",
    });
  } catch (error) {
    console.log(err);
    res.status(400).json({ success: false, message: "Không thành công!" });
  }
};

export const deleteBill = async (req, res) => {
  try {
    BillModel.deleteOne({ id: req.body.id })
      .then(() => console.log("Success"))
      .catch((err) => console.log(err));
    return res.status(200).json({
      success: true,
      message: "Xóa thành công!",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Xóa không thành công!" });
  }
};

export const upadteBill = async (req, res) => {
  const bill = req.body;
  if (!bill) {
    return res
      .status(400)
      .json({ success: false, message: "Cập nhật không thành công!" });
  }
  try {
    const existBill = await BillModel.findOne({id: bill.id});
    if (existBill) {
      await BillModel.findOneAndUpdate(bill);
      res.status(200).json({ success: true, message: "Cập nhật thành công!", data: bill });
    }
  } catch (error) {
    console.log(err);
    res
      .status(400)
      .json({ success: false, message: "Cập nhật không thành công!" });
  }
};

export const updateCustomer = async (req, res) => {
  const customer = req.body;
  if (!customer) {
    return res
      .status(400)
      .json({ success: false, message: "Cập nhật không thành công!" });
  }
  try {
    const existCustomer = await CustomerModel.findOne({
      customerCode: customer.customerCode,
    });
    if (existCustomer) {
      await CustomerModel.findOneAndUpdate(customer);
      res
        .status(200)
        .json({
          success: true,
          message: "Cập nhật thành công!",
          data: customer,
        });
    }
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Cập nhật không thành công!" });
  }
};

export const changeAuth = async (req, res) => {
  const { id, role } = req.body;
  try {
    await UserModel.findByIdAndUpdate(id, { role: !role });
    res.status(200).json({ success: true, message: "Cập nhật thành công!" });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Đổi quyền không thành công!" });
  }
};

export const createBill = async (req, res) => {
  const bill = req.body;
  if (!bill) {
    return res
      .status(400)
      .json({ success: false, message: "Thêm không thành công!" });
  }
  try {
    const existBill = await BillModel.findOne({
      signinDate: bill.signinDate,
    });
    const customer = await CustomerModel.findOne({
      customerCode: bill.customerCode,
    });
    if (existBill || !customer) {
      return res.status(400).json({
        success: false,
        message: !customer
          ? "Mã khách hàng không đúng!"
          : "Hóa đơn đã tồn tại!",
      });
    }
    const newBill = new BillModel(bill);
    newBill.save();
    res.status(200).json({
      success: true,
      message: "Thêm thành công!",
    });
  } catch (error) {
    console.log(err);
    res.status(400).json({ success: false, message: "Không thành công!" });
  }
};

export const getBills = async (req, res) => {
  try {
    const bills = await BillModel.find();
    return res.status(200).json({
      success: true,
      message: "Lấy thông tin thành công",
      data: bills,
    });
  } catch (error) {
    console.log(err);
    res
      .status(400)
      .json({ success: false, message: "Lấy thông tin không thành công!" });
  }
};
