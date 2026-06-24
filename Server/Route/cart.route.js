import express from 'express';
import auth from '../Middleware/auth.js';
import { getCartItemController, removeCartItemController, updateCartItemController } from '../Controllers/cart.controller.js';

const cartRouter = express.Router();

cartRouter.get('/', auth, getCartItemController);
cartRouter.post('/', auth, updateCartItemController);
cartRouter.delete('/:productId', auth, removeCartItemController);

export default cartRouter;