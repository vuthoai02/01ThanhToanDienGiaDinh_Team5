import { UserModel } from "../models/UserModel.js";
import { CustomerModel } from "../models/CustomerModel.js";

export const changePassword = async (req, res) => {
  const {userId, password} = req.body;
  try {
    // const user = await UserModel.findById(userId);
    // console.log(user)
    // if (user) {
    //   await user.updateOne({ ...user, password: password });
    //   res.status(200).json({ success: true, message: "Cập nhật thành công" });
    // }
    await UserModel.updateOne({userId}, {$set: {'password': password}});
    res.status(200).json({ success: true, message: "Cập nhật thành công" });
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: "Bạn chưa đăng nhập!" });
  }
};

export const getUser = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await UserModel.findById(userId).select("-password");
    return res.status(200).json({
      success: true,
      message: "Lấy thông tin thành công",
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: "Bạn chưa đăng nhập!" });
  }
};

export const getUserByEmail = async (req, res) => {
  const email = req.query.email;
  try {
    const user = await UserModel.findOne({ email: email });
    return res.status(200).json({
      success: true,
      message: "Lấy thông tin thành công",
      data: user,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Không tìm thấy người dùng này!" });
  }
};

export const updateCustomerCode = async (req, res) => {
  const { id, customerCode } = req.body;
  try {
    const customer = await CustomerModel.findOne({
      customerCode: customerCode,
    });
    if (!customer) {
      return res
        .status(400)
        .json({ success: false, message: "Mã khách hàng không đúng!" });
    }
    await UserModel.findByIdAndUpdate(id, { customerCode: customerCode });
    res.status(200).json({ success: true, message: "Cập nhật thành công!" });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Cập nhật không thành công!" });
  }
};

