import express from 'express';
import auth from '../Middleware/auth.js';
import upload from '../Middleware/multer.js';
import { createCategory, deleteCategory, getCategories, getCategory, getCategoryCount, getCategoryTree, getParentCategories, getSubCategoryCount, removeImageFromCloudinary, toggleCategoryStatus, updatedCategory, uploadImages } from '../Controllers/category.controller.js';
import cache from '../Middleware/cache.middleware.js';
import { admin } from '../Middleware/admin.middleware.js';

const categoryRouter = express.Router();

categoryRouter.post('/uploadImages', auth, upload.array('images'), uploadImages);
categoryRouter.post('/createCategory', auth, admin, createCategory);
categoryRouter.get('/', getCategories);
categoryRouter.get('/category-count', getCategoryCount);
categoryRouter.get('/subCategory-count', getSubCategoryCount);
categoryRouter.get('/parent-categories', getParentCategories);
categoryRouter.get('/tree', getCategoryTree);
categoryRouter.get('/:id', getCategory);
categoryRouter.delete('/deleteImage', auth, removeImageFromCloudinary);
categoryRouter.patch('/toggle-status/:id', auth, admin, toggleCategoryStatus);
categoryRouter.delete('/:id', auth, admin, deleteCategory);
categoryRouter.put('/:id', auth, admin, updatedCategory);

export default categoryRouter;