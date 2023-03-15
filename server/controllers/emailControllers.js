import { UserModel } from "../models/UserModel.js";
import nodeMailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;
const mailHost = process.env.MAIL_HOST;
const mailPort = process.env.MAIL_PORT;

const transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false,
    auth: {
        user: adminEmail,
        pass: adminPassword
    }
});

const options = (email, subject, htmlContent) => ({
    from: adminEmail,
    to: email,
    subject: subject,
    html: htmlContent
})

const generatePassword = () => {
    let password = "";
    const characters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789"
    for (let i = 0; i < 8; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return password;
  };

export const forgotPassword = async (req, res) => {
  const userEmail = req.body;
  try {
    const user = await UserModel.findById({email: userEmail});
    if(user){
        const newPassword = generatePassword();
        await user.updateOne({...user, password: newPassword});
        transporter.sendMail(options(userEmail,'Lấy lại mật khẩu!',newPassword));
        res.status(200).json({ success: true, message: "Kiểm tra email của bạn!" });
    }
  } catch (error) {
    console.log(err);
    res.status(400).json({ success: false, message: "Lấy mật khẩu không thành công!" });
  }
};
