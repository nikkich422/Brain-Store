import orderModel from "../models/order.model.js";
import productModel from "../models/product.model.js"
import userModel from "../models/user.model.js";

export const getDashboardStats = async (req, res) => {
    try {
        const totalProducts = await productModel.countDocuments();
        const totalUsers = await userModel.countDocuments();
        const totalOrders = await orderModel.countDocuments();
        const pendingOrders = await orderModel.countDocuments({
            status: "pending"
        })

        const revenueData = await orderModel.aggregate([
            {
                $match: {
                    paymentStatus: "paid"
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalAmt" }
                }
            }
        ])

        const totalRevenue = revenueData[0]?.totalRevenue || 0;
        
        // Last 7 days sales
        const salesChart = await orderModel.aggregate([
            {
                $match: {
                    paymentStatus: "paid",
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                        day: { $dayOfMonth: "$createdAt" },
                    },
                    total: { $sum: "$totalAmt" }
                }
            },
            { $sort: {
                    "_id.year" : 1,
                    "_id.month" : 1,
                    "_id.date": 1 
                } 
            }
        ]);

        // recent orders
        const recentOrders = await orderModel
        .find()
        .sort({ createdAt: -1 })
        .limit(5)
        .lean();

        // low stock prodcuts
        const lowStockProducts = await productModel
        .find({ stock_count: { $lt: 5 }})
        .limit(5);

        res.json({
            success: true,
            data: {
                totalProducts,
                totalUsers,
                totalOrders,
                totalRevenue,
                salesChart,
                recentOrders,
                lowStockProducts,
                pendingOrders,
            }
        })

    } catch (error) {
        res.status(500).json({
            error: true,
            message: error?.message || "Server error",
        })
    }
} 