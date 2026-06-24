import express from 'express';
import auth from '../Middleware/auth.js';
import upload from '../Middleware/multer.js';
import { createProduct, deleteProduct, getProductBySlug, getProducts, getSingleProduct, removeImageFromCloudinary, updateProduct } from '../Controllers/product.controller.js';
import cache from '../Middleware/cache.middleware.js';
import { admin } from '../Middleware/admin.middleware.js';

const productRouter = express.Router();

productRouter.post('/', auth, admin, upload.array('images'), createProduct);

productRouter.get('/', cache(600), getProducts);
productRouter.get('/slug/:slug', getProductBySlug);
productRouter.get('/id/:id', getSingleProduct);

productRouter.put('/:id', auth, admin, upload.array('images'), updateProduct);

productRouter.delete('/deleteImage', auth, admin, removeImageFromCloudinary);
productRouter.delete('/:id', auth, admin, deleteProduct);

export default productRouter;