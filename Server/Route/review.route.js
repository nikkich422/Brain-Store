import express from 'express';
import auth from '../Middleware/auth.js';
import { addReview, getProductReviews } from '../Controllers/review.controller.js';

const reviewRouter = express.Router();

reviewRouter.post('/', auth, addReview);
reviewRouter.get('/:id', getProductReviews);

export default reviewRouter;