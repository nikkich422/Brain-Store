import razorpayInstance from "../Config/razorpay.js";
import crypto from "crypto";
import orderModel from "../models/order.model.js";

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
    try {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        orderId
      } = req.body;
  
      const body = razorpay_order_id + "|" + razorpay_payment_id;
  
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");
  
      const isValid = expectedSignature === razorpay_signature;
  
      if (!isValid) {
        return res.status(400).json({
          success: false,
          message: "Payment verification failed",
        });
      }
  
      // Update Order in DB
      const order = await orderModel.findByIdAndUpdate(
        orderId,
        {
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
  
          paymentStatus: "paid",
          status: "confirmed",
          paidAt: new Date(),
        },
        { new: true }
      );
  
  
      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      });
  
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: error.message,
      });
    }
  };