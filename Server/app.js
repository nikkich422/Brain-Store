import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import passport from 'passport';

import userRouter from './Route/user.route.js';
import categoryRouter from "./Route/category.route.js";
import productRouter from "./Route/product.route.js";
import cartRouter from "./Route/cart.route.js";
import wishlistRouter from "./Route/wishlist.route.js";
import addressRouter from './Route/address.route.js';
import paymentRouter from './Route/payment.route.js';
import orderRouter from './Route/order.route.js';
import searchRouter from './Route/search.route.js';
import dashboardRouter from './Route/dashboard.route.js';
import adminRouter from './Route/admin.route.js';
import reviewRouter from './Route/review.route.js';
import bannerRouter from './Route/banner.route.js';

import "./Config/env.js";
import "./Config/passport.js";
import { errorHandler } from './Middleware/errorHandler.js';
import { globalLimiter } from './Middleware/rateLimiter.js';
import { requestId } from './Middleware/requestId.js';
// import xss from "xss-clean";
import os from "os";
import { sanitizeBody } from './Middleware/sanitize.js';

const app = express();

// Security
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(helmet({
  crossOriginResourcePolicy: false,
  contentSecurityPolicy: false,
}));
app.disable('x-powered-by');

// Parsing
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);
app.use(sanitizeBody);
// app.use(xss());

// Logging (dev only)
if (process.env.NODE_ENV === "development") {
  app.use(morgan('dev'));
}

//  Performance 
app.use(compression());

app.use(requestId);

// Rate Limiting
app.use('/api', globalLimiter);

// Auth
app.use(passport.initialize());

// Health
app.get('/', (req, res) => {
  res.json({ message: 'Brain Store API is running', port: process.env.PORT || 8000 });
});
app.get("/health", (req, res) => {
  res.json({
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    cpu: os.loadavg(),
  });
});

// Routes
app.use('/api/user',      userRouter);
app.use('/api/category',  categoryRouter);
app.use('/api/product',   productRouter);
app.use('/api/cart',      cartRouter);
app.use('/api/wishlist',  wishlistRouter);
app.use('/api/address',   addressRouter);
app.use('/api/payment',   paymentRouter);
app.use('/api/order',     orderRouter);
app.use('/api/search',    searchRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/admin',     adminRouter);
app.use('/api/review',    reviewRouter);
app.use('/api/banner',    bannerRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found", success: false });
});

// Global Error Handler
app.use(errorHandler);

export default app;
