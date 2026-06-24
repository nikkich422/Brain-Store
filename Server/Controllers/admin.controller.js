import userModel from "../models/user.model.js";

export const getUsers = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search || "";
        const role = req.query.role || "";
        const status = req.query.status || "";

        const sortField = req.query.sortField || "createdAt";
        const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

        const skip = (page - 1) * limit;
        const query = {};
        
        if(search){
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ]
        };
        if(role){
            query.role = role;
        }
        if(status){
            query.status = status;
        }

        const users = await userModel
        .find(query)
        .select("-refreshTokens")
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(limit);

        const totalUsers = await userModel.countDocuments(query);

        return res.status(200).json({
            success: true,
            data: users,
            pagination: {
                total: totalUsers,
                page,
                limit,
                totalPages: Math.ceil(totalUsers / limit),
            }
        })

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message,
        })
    }
}

export const getUsersStats = async (req, res) => {
    try {
        
        const [totalUsers, activeUsers, suspendedUsers, inactiveUsers, adminUsers, verifiedUsers]
         = await Promise.all([
            userModel.countDocuments(),

            userModel.countDocuments({
                status: "Active"
            }),
            userModel.countDocuments({
                status: "Suspended",
            }),
            userModel.countDocuments({
                status: "Inactive",
            }),
            userModel.countDocuments({
                role: "Admin",
            }),
            userModel.countDocuments({
                isEmailVerified: true,
            }),
         ]);

         return res.status(200).json({
            success: true,

            data: {
                totalUsers,
                activeUsers,
                suspendedUsers,
                inactiveUsers,
                adminUsers,
                verifiedUsers,
            },
         })
    } catch (error) {
        
    }
}

export const updateUserStatus = async (req, res) => {
    try {
        
        const { status } = req.body;

        if(!["Active", "Inactive", "Suspended"].includes(status)){
            return res.status(400).json({
                error: true,
                message: error.message,
            })
        }

        if(req.user.id === req.params.id){
            return res.status(400).json({
                error: true,
                message: "You cannot change your own status",
            })
        }

        const user = await userModel.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        )

        return res.status(200).json({
            success: true,
            message: "User status updated.",
            data: user,
        })

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message,
        })
    }
}

export const updateUserRole = async (req, res) => {
    try {
        
        const { role } = req.body;

        if(!["User", "Admin"].includes(role)){
            return res.status(400).json({
                error: true,
                message: "Invalid Role",
            })
        }

        const user = await userModel.findByIdAndUpdate(
            req.params.id,
            { role },
            { new : true }
        );

        return res.status(200).json({
            success: true,
            message: "User role updated successfully",
            data: user,
        })

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message
        })
    }
}