import express from "express";
import { getDashboardStats } from "../Controllers/dashboard.controller.js";
import auth from "../Middleware/auth.js";
import { admin } from "../Middleware/admin.middleware.js";

const dashboardRouter = express.Router();

dashboardRouter.get('/', auth, admin, getDashboardStats);

export default dashboardRouter;