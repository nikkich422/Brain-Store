import express from "express";
import auth from "../Middleware/auth.js";
import {admin} from "../Middleware/admin.middleware.js";
import { getUsers, getUsersStats, updateUserRole, updateUserStatus } from "../Controllers/admin.controller.js";

const adminRouter = express.Router();

adminRouter.get('/users', auth, admin, getUsers);
adminRouter.patch('/users/:id/status', auth, admin, updateUserStatus);
adminRouter.patch('/users/:id/role', auth, admin, updateUserRole);
adminRouter.get('/users/stats', auth, admin, getUsersStats);

export default adminRouter;