import orderModel from "../models/order.model.js";
import crypto from 'crypto';

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cartItems, address, totalAmount } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Generate Order Number
    const orderNumber = `ORD-${Date.now()}`;

    // Calculate Subtotal
    const subTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Estimated Delivery (4–8 days random)
    const minDays = 4;
    const maxDays = 8;
    const randomDays =
      Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;

    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(
      estimatedDelivery.getDate() + randomDays
    );

    // Prepare Order Items
    const orderItems = cartItems.map((item) => ({
      productId: item.productId?._id || item.productId,
      name: item.title,
      image: item.image,
      price: item.price,
      qty: item.quantity,
      size: item?.size || null,
      totalPrice: item.price * item.quantity,
    }));

    // Create Order
    const order = await orderModel.create({
      userId,
      orderNumber,
      orderItems,
      deliveryAddress: {
        fullName: address.fullName,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        country: address.country,
        mobile: address.mobile,
      },
      subTotalAmt: subTotal,
      totalAmt: totalAmount,
      paymentMethod: "ONLINE",
      estimatedDelivery,
    });

    return res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Server error",
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
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
        message: "Invalid payment",
      });
    }

    // Update Order
    await orderModel.findByIdAndUpdate(orderId, {
      paymentStatus: "paid",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      status: "confirmed",
      paidAt: new Date(),
    });

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export async function getOrders(req, res){
  try {
    const userId = req.user.id;

    const orders = await orderModel
    .find({ userId })
    .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders,
    })

  } catch (error) {
      return res.status(500).json({
        error: true,
        message: error.message || "Server error",
      })
  }
}

export async function getSingleOrder(req, res){
  try {
    const userId = req.user.id;
    const orderId = req.params.id;

    const order = await orderModel.findOne({
      _id: orderId,
      userId
    })
    
    if(!order){
      return res.status(404).json({
        error: true,
        message: "Order not found.",
      })
    }
    return res.status(200).json({
      success: true,
      order,
    })

  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message || "Server error",
    })
  }
}

export async function cancelOrder(req, res){
  try {
    const orderId = req.params.id;

    const order = await orderModel.findById(orderId);

    if(!order){
      return res.status(404).json({
        error: true,
        message: "Order not found",
      })
    }

    if(order.status === "delivered"){
      return res.status(400).json({
        error: true,
        message: "Cannot cancel delivered order",
      })
    }

    order.status = "cancelled";
    order.cancelledAt = new Date();

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order cancelled Successfully.",
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message || "Server error",
    })
  }
}

// Admin Controllers
export async function getAllOrders(req, res) {
  try {
    const orders = await orderModel
    .find()
    .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders,
    })

  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message || "Server Error",
    })
  }
}

export async function updateOrderStaus(req, res){
  try {
    const {status} = req.body;
    const orderId = req.params.id;

    const order = await orderModel.findById(orderId);

    if(!order){
      return res.status(500).json({
        error: true,
        message: "Order not found",
      })
    }

    order.status = status;

    if(status === "delivered"){
      order.deliveredAt = new Date();
    }
    if(status === "cancelled"){
      order.cancelledAt = new Date();
    }

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order status Updated",
      order,
    })

  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message || "Server Error",
    })
  }
}

export async function getAdminSingleOrder(req, res){
  try {
    
    const orderId = req.params.id;
    const order = await orderModel.findById(orderId);

    if(!order){
      return res.status(404).json({
        error: true,
        message: "Order not found",
      })
    }

    return res.status(200).json({
      success: true,
      order,
    })

  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error?.message || "Server error",
    })
  }
}