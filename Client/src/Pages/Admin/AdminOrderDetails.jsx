import React, { useEffect, useState } from "react";
import {
  Box,
  Chip,
  CircularProgress,
  Divider,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";

import {
  CheckCircle,
  LocalShipping,
  Inventory,
  DoneAll,
} from "@mui/icons-material";

import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../api/api";

const steps = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
];

const AdminOrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState("");

  const fetchOrder = async () => {
    try {
      setLoading(true);

      const { data } = await API.get(`/api/order/admin/${id}`);

      setOrder(data.order);

      setStatus(data.order.status);
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const updateStatus = async (value) => {
    try {
      setStatus(value);

      await API.put(`/api/order/admin/status/${id}`, {
        status: value,
      });

      toast.success("Order status updated");

      fetchOrder();
    } catch (error) {
      console.log(error);

      toast.error("Failed to update");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-6">
      {/* HEADER */}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row justify-between gap-5">
          <div>
            <h1 className="text-3xl font-black text-gray-800">
              {order.orderNumber}
            </h1>

            <p className="text-gray-500 mt-2">
              Ordered on{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Chip
              label={order.paymentStatus}
              color={
                order.paymentStatus === "paid"
                  ? "success"
                  : "error"
              }
            />

            <Select
              value={status}
              onChange={(e) => updateStatus(e.target.value)}
              size="small"
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="shipped">Shipped</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </div>
        </div>
      </div>

      {/* TIMELINE */}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mt-6">
        <h2 className="text-2xl font-black mb-6">
          Order Timeline
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
          {steps.map((step, index) => {
            const currentIndex = steps.indexOf(order.status);

            const completed = index <= currentIndex;

            return (
              <div
                key={step}
                className={`rounded-2xl p-5 border ${
                  completed
                    ? "bg-green-50 border-green-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex justify-center mb-3">
                  {index === 0 && (
                    <Inventory
                      className={
                        completed
                          ? "text-green-600"
                          : "text-gray-400"
                      }
                    />
                  )}

                  {index === 1 && (
                    <CheckCircle
                      className={
                        completed
                          ? "text-green-600"
                          : "text-gray-400"
                      }
                    />
                  )}

                  {index === 2 && (
                    <Inventory
                      className={
                        completed
                          ? "text-green-600"
                          : "text-gray-400"
                      }
                    />
                  )}

                  {index === 3 && (
                    <LocalShipping
                      className={
                        completed
                          ? "text-green-600"
                          : "text-gray-400"
                      }
                    />
                  )}

                  {index === 4 && (
                    <DoneAll
                      className={
                        completed
                          ? "text-green-600"
                          : "text-gray-400"
                      }
                    />
                  )}
                </div>

                <h3
                  className={`text-center font-bold capitalize ${
                    completed
                      ? "text-green-700"
                      : "text-gray-500"
                  }`}
                >
                  {step}
                </h3>
              </div>
            );
          })}
        </div>
      </div>

      {/* MAIN GRID */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* PRODUCTS */}

        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-2xl font-black mb-5">
            Ordered Items
          </h2>

          <div className="space-y-5">
            {order.orderItems.map((item) => (
              <div
                key={item._id}
                className="flex gap-5 border border-gray-100 rounded-2xl p-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 rounded-2xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800">
                    {item.name}
                  </h3>

                  <div className="flex gap-4 mt-3 text-sm text-gray-500">
                    <span>Qty: {item.qty}</span>

                    <span>Size: {item.size || "N/A"}</span>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <span className="font-black text-xl">
                      ₹ {item.price}
                    </span>

                    <span className="font-bold text-green-600">
                      ₹ {item.totalPrice}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SIDE */}

        <div className="space-y-6">
          {/* CUSTOMER */}

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-black mb-4">
              Customer Details
            </h2>

            <div className="space-y-3 text-sm">
              <p>
                <span className="font-bold">Name:</span>{" "}
                {order.deliveryAddress.fullName}
              </p>

              <p>
                <span className="font-bold">Phone:</span>{" "}
                {order.deliveryAddress.mobile}
              </p>

              <Divider />

              <p className="leading-7">
                {order.deliveryAddress.addressLine1}
                <br />

                {order.deliveryAddress.addressLine2}
                <br />

                {order.deliveryAddress.city},{" "}
                {order.deliveryAddress.state}
                <br />

                {order.deliveryAddress.country} -{" "}
                {order.deliveryAddress.pincode}
              </p>
            </div>
          </div>

          {/* PAYMENT */}

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-black mb-4">
              Payment Details
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Method</span>

                <span className="font-bold">
                  {order.paymentMethod}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Status</span>

                <span className="font-bold capitalize">
                  {order.paymentStatus}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Total</span>

                <span className="font-black text-lg">
                  ₹ {order.totalAmt}
                </span>
              </div>
            </div>
          </div>

          {/* SUMMARY */}

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-black mb-4">
              Price Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>

                <span>₹ {order.subTotalAmt}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>

                <span>₹ {order.shippingFee}</span>
              </div>

              <Divider />

              <div className="flex justify-between text-xl font-black">
                <span>Total</span>

                <span>₹ {order.totalAmt}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;