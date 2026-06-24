import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await API.get("/api/order");
      setOrders(data?.orders || []);
    } catch (error) {
      setError("Failed to load Orders");
      toast.error("Failed to load Orders");
    } finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "text-green-600 bg-green-100";
      case "processing":
        return "text-blue-600 bg-blue-100";
      case "shipped":
        return "text-purple-600 bg-purple-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const ShimmerCard = () => {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-5 mb-5 animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-1/3 mb-3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-3"></div>
        <div className="border-t border-gray-300 my-3"></div>
        <div className="flex gap-3">
          <div className="w-14 h-14 bg-gray-300 rounded"></div>
          <div className="flex-1">
            <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen py-10 px-4">
        <div className="max-w-5xl mx-auto!">
          {[...Array(4)].map((_, i) => (
            <ShimmerCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto!">
        {/* Header */}
        <h2 className="text-2xl font-bold mb-6! text-gray-800">My Orders</h2>

        {error ? (
          <div className="text-center text-red-500 mt-10!">{error}</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-500 mt-20!">
            No orders found 🛒
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-sm border border-gray-300 mb-5! p-5 hover:shadow-md transition"
            >
              {/* Top Section */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-4!">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-semibold text-gray-800">
                    {order.orderNumber}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-semibold text-gray-800">
                    ₹{order.totalAmt}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Payment</p>
                  <p className="font-semibold text-gray-800 capitalize">
                    {order.paymentStatus}
                  </p>
                </div>

                {/* Status Badge */}
                <div>
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-semibold capitalize ${getStatusColor(
                      order?.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 mb-4!"></div>

              {/* Items */}
              <div className="flex flex-col gap-3">
                {order?.orderItems?.map((item, index) => (
                  <div
                    key={item.productId || index}
                    className="flex gap-3 items-center"
                  >
                    <img
                      src={item.image}
                      className="w-14 h-14 rounded"
                      alt={item.name}
                    />

                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>

                      <div className="text-sm text-gray-500 flex gap-3">
                        <div className="flex gap-2 mt-1">
                          {item.size && (
                            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded font-semibold">
                              {item.size}
                            </span>
                          )}
                        </div>
                        <span>Qty: {item.qty}</span>
                      </div>
                    </div>

                    <p className="font-semibold">₹{item.price}</p>
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-500 mt-2!">
                Delivery by{" "}
                <span className="font-semibold text-gray-700">
                  {order.estimatedDelivery
                    ? new Date(order.estimatedDelivery).toDateString()
                    : "N/A"}
                </span>
              </p>
              {/* Bottom Actions */}
              <div className="flex justify-center items-center mt-5!">
                <button
                  onClick={() => navigate(`/order/${order._id}`)}
                  className="text-blue-600 font-semibold cursor-pointer hover:underline"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;