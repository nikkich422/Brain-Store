import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 👉 orderId pass kar sakta hai navigate se
  const orderId = location.state?.orderId || "ORD-" + Date.now();

  return (
    <div className="flex items-center justify-center bg-gray-100 px-4">

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center my-10"
      >

        {/* ✅ Success Icon with animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-4!"
        >
          <FaCheckCircle className="text-green-500 text-6xl" />
        </motion.div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2!">
          Payment Successful 🎉
        </h1>

        {/* Order ID */}
        <p className="text-sm text-gray-500 mb-4!">
          Order ID:{" "}
          <span className="font-semibold text-gray-700">{orderId}</span>
        </p>

        {/* Subtext */}
        <p className="text-gray-600 mb-6!">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Info */}
        <div className="text-sm text-gray-500 mb-6!">
          <p>You will receive order updates on your registered contact.</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/orders")}
            className="btn-primary py-2 font-semibold"
          >
            View My Orders
          </button>

          <button
            onClick={() => navigate("/")}
            className="btn-secondary py-2 font-semibold"
          >
            Continue Shopping
          </button>
        </div>

      </motion.div>
    </div>
  );
};

export default OrderSuccess;