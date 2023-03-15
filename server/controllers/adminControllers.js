import { UserModel } from "../models/UserModel";
import { CustomerModel } from "../models/CustomerModel";

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
  const userId = req.userId;
  try {
    UserModel.findById(userId, function (error, user) {
      if (!error) user.remove();
    });
    return res.status(200).json({
      success: true,
      message: "Xóa thành công!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Xóa không thành công!" });
  }
};

export const deleteCustomer = async (req, res) => {
  const customerCode = req.query.customerCode;
  try {
    CustomerModel.findOne(customerCode, function (error, customer) {
      if (!error) customer.remove();
    });
    return res.status(200).json({
      success: true,
      message: "Xóa thành công!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Xóa không thành công!" });
  }
};

export const createCustomer = async (req, res) => {
  const customer = req.body;
  if (customer) {
    return res
      .status(400)
      .json({ success: false, message: "Thêm khách hàng không thành công!" });
  }
  try {
    const existCustomer = CustomerModel.findOne({
      customerCode: customer.customerCode,
    });
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
  } catch (error) {}
};

export const deleteBill = async (req, res) => {
  const { customerCode, invoiceId } = req.query.data;
  try {
    const customer = await CustomerModel.findOne(customerCode);
    if (customer) {
      await customer.updateOne({
        ...customer,
        electricityList: [
          ...customer.electricityList.filter(
            (elm) => elm.invoiceId != invoiceId
          ),
        ],
      });
      res.status(200).json({ success: true, message: "Xóa thành công" });
    }
  } catch (error) {
    console.log(err);
    res.status(400).json({ success: false, message: "Xóa không thành công!" });
  }
};

export const upadteBill = async (req, res) => {
  const { customerCode, invoiceId, newbill } = req.query.data;
  try {
    const customer = await CustomerModel.findOne(customerCode);
    if (customer) {
      await customer.updateOne({
        ...customer,
        electricityList: [
          ...customer.electricityList.filter(
            (elm) => elm.invoiceId != invoiceId
          ),
          newbill,
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

export const updateCustomer = async (req,res) => {
    const customer = req.body;
    if(customer){
        return res.status(400).json({success: false, message: "Cập nhật không thành công!"});
    }
    try {
        const existCustomer = await CustomerModel.findOne({customerCode: customer.customerCode});
        if(existCustomer){
            await CustomerModel.findOneAndUpdate(customer);
            res.status(200).json({success: true, message: "Cập nhật thành công!"});
        }
    } catch (error) {
        
    }
}
