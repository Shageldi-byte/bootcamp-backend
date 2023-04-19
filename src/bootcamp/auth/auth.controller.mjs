import express from "express";
import {getProfile, login, loginWeb, signUp} from "./auth.service.mjs";
import {authenticateToken} from "./jwt.service.mjs";

const authController = express.Router();

authController.post('/admin/sign-in', login);
authController.post('/web/sign-in', loginWeb);
authController.post('/web/sign-up',signUp);
authController.get('/web/get-profile',authenticateToken,getProfile);

export default authController;