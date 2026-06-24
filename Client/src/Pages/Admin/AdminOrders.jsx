import React, { useEffect, useState } from 'react';
import API from '../../api/api.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchOrders = async () => {
        try {
            const { data } = await API.get('/api/order/admin/all');
            setOrders(data.orders);

        } catch (error) {
            toast("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    const getStatusColor = (status) => {
        switch(status){
            case "pending":
                return "bg-yellow-100 text-yellow-700 border";

            case "confirmed":
                return "bg-blue-100 text-blue-700 border";

            case "processing":
                return "bg-purple-100 text-purple-700 border";

            case "shipped":
                return "bg-indigo-100 text-indigo-700 border";

            case "delivered":
                return "bg-green-100 text-green-700 border";

            case "cancelled":
                return "bg-red-100 text-red-700 border";

            default:
                return "bg-gray-100 text-gray-700 border";
        }
    }

    if(loading){
        return (
            <div className='flex justify-center items-center h-screen'>
                Loading...
            </div>
        )
    }

    return (
        <div className="px-6 py-2 bg-gray-50">
          {/* HEADER */}
          <div className="mb-4">
            <h1 className="text-3xl font-bold">
              Orders Management
            </h1>
    
            <p className="text-gray-500 mt-1">
              Manage all customer orders
            </p>
          </div>
    
          {/* TABLE */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
    
              <table className="w-full">
    
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold">
                      Order
                    </th>
    
                    <th className="text-left p-4 text-sm font-semibold">
                      Date
                    </th>
    
                    <th className="text-left p-4 text-sm font-semibold">
                      Payment
                    </th>
    
                    <th className="text-left p-4 text-sm font-semibold">
                      Total
                    </th>
    
                    <th className="text-left p-4 text-sm font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
    
                <tbody>
    
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      onClick={() => navigate(`/admin/orders/${order._id}`)}
                      className="border-b border-gray-400 bg-gray-50 hover:bg-red-50 transition cursor-pointer"
                    >
                      {/* ORDER */}
                      <td className="p-4">
                        <div>
                          <p className="font-semibold">
                            {order.orderNumber}
                          </p>
    
                          <p className="text-sm text-gray-500">
                            {order.deliveryAddress?.fullName}
                          </p>
                        </div>
                      </td>
    
                      {/* DATE */}
                      <td className="p-4 text-sm text-gray-600">
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </td>
    
                      {/* PAYMENT */}
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.paymentStatus === "paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
    
                      {/* TOTAL */}
                      <td className="p-4 font-semibold">
                        ₹{order.totalAmt}
                      </td>
    
                      {/* STATUS */}
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
    
                </tbody>
              </table>
    
            </div>
          </div>
        </div>
    );
}

export default AdminOrders;
