import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../api/api";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  
  const printRef = useRef();
  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await API.get(`/api/order/${id}`);
      setOrder(data.order);
    } catch (error) {
      setError("Failed to fetch order");
      toast.error("Failed to fetch order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const handleCancelOrder = async () => {
    try {
      setCancelLoading(true);
      setError(null);
      await API.put(`/api/order/cancel/${id}`);
      toast.success("Order cancelled successfully");
      fetchOrder();
    } catch (error) {
      toast.error("Cancel failed");
    } finally {
      setCancelLoading(false);
    }
  };

  // STATUS PROGRESS
  const statusSteps = ["pending", "confirmed", "processing", "shipped", "delivered"];
  const currentStep = Math.max(0, statusSteps.indexOf(order?.status));

  const progressPercent = ((currentStep + 1) / statusSteps.length) * 100;

  const getPaymentColor = () => {
    switch (order?.paymentStatus) {
      case "paid":
        return "text-green-600 bg-green-100";
      case "failed":
        return "text-red-600 bg-red-100";
      default:
        return "text-yellow-600 bg-yellow-100";
    }
  };

  const ShimmerDetails = () => {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md animate-pulse">
        <div className="h-5 bg-gray-300 w-1/3 mb-4 rounded"></div>
  
        <div className="h-3 bg-gray-300 w-1/4 mb-2 rounded"></div>
        <div className="h-3 bg-gray-300 w-1/5 mb-4 rounded"></div>
  
        <div className="h-2 bg-gray-300 rounded mb-6"></div>
  
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-16 h-16 bg-gray-300 rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <ShimmerDetails />
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center text-red-500 mt-20">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <div ref={printRef}>
        {/* HEADER */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold">Order Details</h2>
            <p className="text-sm text-gray-500">
              Order ID: {order?.orderNumber}
            </p>
            <p className="text-sm text-gray-500">
              Placed on: {new Date(order?.createdAt).toLocaleString()}
            </p>
          </div>

          <span className={`px-3 py-1 text-xs rounded ${getPaymentColor()}`}>
            {order?.paymentStatus.toUpperCase()}
          </span>
        </div>

        {/* STATUS TRACKER */}
        <div className="mb-6">
          <p className="font-semibold mb-2">Order Status</p>

          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Placed</span>
            <span>Confirmed</span>
            <span>Processing</span>
            <span>Shipped</span>
            <span>Delivered</span>
          </div>

          <div className="h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-green-500 rounded transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <p className="text-sm mt-2 capitalize font-medium text-green-600">
            {order?.status}
          </p>
        </div>

        {/* DELIVERY */}
        <div className="mb-6">
          <p className="font-semibold">Estimated Delivery</p>
          <p className="text-gray-600">
            {order?.estimatedDelivery
              ? new Date(order?.estimatedDelivery).toDateString()
              : "Calculating..."}
          </p>
        </div>

        {/* ITEMS */}
        <div className="mb-6">
          <p className="font-semibold mb-3">Items</p>

          {order?.orderItems?.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 mb-3 border-b pb-3 hover:bg-gray-50 px-2 py-2 rounded"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded border"
              />

              <div className="flex-1">
                <p className="font-medium">{item.name}</p>

                {item.size && (
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded font-semibold">
                    Size: {item.size}
                  </span>
                )}

                <p className="text-sm text-gray-500 font-semibold">
                  Qty: {item.qty}
                </p>
              </div>

              <p className="font-semibold">₹{item.totalPrice}</p>
            </div>
          ))}
        </div>

        {/* PRICE DETAILS */}
        <div className="mb-6 border-t pt-4">
          <p className="font-semibold mb-2">Price Details</p>

          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₹{order?.subTotalAmt}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>₹{order?.shippingFee || 0}</span>
          </div>

          <div className="flex justify-between font-bold mt-2 border-t pt-2">
            <span>Total</span>
            <span>₹{order?.totalAmt}</span>
          </div>
        </div>

        {/* ADDRESS */}
        <div className="mb-6 border-t pt-4">
          <p className="font-semibold mb-2">Delivery Address</p>

          <p className="font-medium">
            {order?.deliveryAddress?.fullName}
          </p>

          <p className="text-gray-600">
            {[
              order?.deliveryAddress?.addressLine1,
              order?.deliveryAddress?.addressLine2,
              order?.deliveryAddress?.city,
              order?.deliveryAddress?.state,
              order?.deliveryAddress?.pincode,
            ]
              .filter(Boolean)
              .join(", ")}
          </p>

          <p className="text-gray-600 mt-1">
            Phone: {order?.deliveryAddress?.mobile}
          </p>
        </div>
        </div>
        {/* ACTIONS */}
        <div className="flex gap-3">
          {order?.status !== "delivered" && order?.status !== "cancelled" && (
            <button
              onClick={handleCancelOrder}
              className={`btn-primary ${cancelLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={cancelLoading}
            >
              {cancelLoading ? "Cancelling..." : "Cancel Order"}
            </button>
          )}

          <button
            onClick={handlePrint}
            className="btn-secondary"
          >
            Download Invoice
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderDetails;