import express from 'express';
import auth from '../Middleware/auth.js';
import { admin } from '../Middleware/admin.middleware.js';
import { createBanner, deleteBanner, getBanners, toggleBanner, updateOrder } from '../Controllers/banner.controller.js';
import upload from '../Middleware/multer.js';

const bannerRouter = express.Router();

bannerRouter.post('/', auth, upload.single('image'), admin, createBanner);
bannerRouter.get('/', getBanners);
bannerRouter.delete('/:id', auth, admin, deleteBanner);
bannerRouter.put('/toggle/:id', auth, admin, toggleBanner);
bannerRouter.put('/order/:id', auth, admin, updateOrder);

export default bannerRouter;