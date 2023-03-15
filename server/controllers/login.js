import { UserModel } from "../models/UserModel.js";
import argon2 from "argon2";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const login = async (req, res) => {
  const userName = req.body.userName;
  const loPassword = req.body.password;

  try {
    const user = await UserModel.findOne({ userName: userName });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Sai tên đăng nhập hoặc mật khẩu" });
    }
    const valid = await argon2.verify(user.password, loPassword);
    if (!valid) {
      return res
        .status(400)
        .json({ success: false, message: "Sai tên đăng nhập hoặc mật khẩu" });
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
    console.log(err);
    res
      .status(400)
      .json({ success: false, message: "Đăng nhập không thành công" });
  }
};
