import express from "express";
import { createOrder, verifyPayment } from "../Controllers/payment.controller.js";
import auth from "../Middleware/auth.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-order", auth, createOrder);
paymentRouter.post("/verify-payment", auth, verifyPayment);

export default paymentRouter;