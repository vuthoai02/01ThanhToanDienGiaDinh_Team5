import { UserModel } from "../models/UserModel.js";
import argon2 from "argon2";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const register = async (req, res) => {
  const user = req.body;
  const { password } = user;

  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "Tạo tài khoản thất bại: not user" });
  }
  try {
    const existUser = await UserModel.findOne({ email: user.email });
    if (existUser) {
      return res
        .status(400)
        .json({ success: false, message: "Tài khoản đã tồn tại" });
    }
    const hashPassword = await argon2.hash(password);
    const newUser = new UserModel({ ...user, password: hashPassword });
    await newUser.save();

    //create accessToken
    const accessToken = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: "Tạo tài khoản thành công",
      accessToken: accessToken,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: "Tạo tài khoản thất bại!" });
  }
};
