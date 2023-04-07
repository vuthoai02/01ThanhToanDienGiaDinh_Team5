import express from "express";

import { changePassword, getUser } from "../controllers/usersControllers.js";
import { login } from "../controllers/login.js";
import { register } from "../controllers/register.js";
import verifyToken from "../controllers/verifyToken.js";

const router = express.Router();
router.get("/", verifyToken, getUser);

router.post('/login',login);
router.post('/register', register);
router.put('change-password', changePassword);

export default router;
