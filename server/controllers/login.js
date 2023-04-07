import { UserModel } from "../models/UserModel.js";
import argon2 from "argon2";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const login = async (req, res) => {
  const email = req.body.email;
  const loPassword = req.body.password;

  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Sai địa chỉ email hoặc mật khẩu" });
    }
    const valid = await argon2.verify(user.password, loPassword);
    if (!valid) {
      return res
        .status(400)
        .json({ success: false, message: "Sai địa chỉ email hoặc mật khẩu" });
    }
    //create accessToken
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET
    );
    const { password, ...data } = user._doc;
    return res.json({
      success: true,
      message: "Đăng nhập thành công",
      data: data,
      accessToken: accessToken,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ success: false, message: "Đăng nhập không thành công" });
  }
};
