import express from 'express';
import auth from '../Middleware/auth.js';
import { cancelOrder, createOrder, getAdminSingleOrder, getAllOrders, getOrders, getSingleOrder, updateOrderStaus, verifyPayment } from '../Controllers/order.controller.js';
import { admin } from '../Middleware/admin.middleware.js';

const orderRouter = express.Router();

orderRouter.get('/admin/all', auth, admin, getAllOrders);
orderRouter.put('/admin/status/:id', auth, admin, updateOrderStaus);
orderRouter.get('/admin/:id', auth, admin, getAdminSingleOrder);

orderRouter.post('/create', auth, createOrder);
orderRouter.post('/verify', auth, verifyPayment);
orderRouter.get('/', auth, getOrders);
orderRouter.put('/cancel/:id', auth, cancelOrder);
orderRouter.get('/:id', auth, getSingleOrder);

export default orderRouter;