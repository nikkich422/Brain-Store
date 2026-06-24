import productModel from "../models/product.model.js";
import reviewModel from "../models/review.model.js";

export const addReview = async (req, res) => {
    try {
        const userId = req.user.id;

        const { productId, rating, comment } = req.body;
        const product = await productModel.findById(productId);

        if(!product){
            return res.status(404).json({
                error: true,
                message: "Product not found",
            })
        }

        // for duplicate Review
        const alreadyReviewed = await reviewModel.findOne({
            productId,
            userId,
        });

        if(alreadyReviewed){
            return res.status(400).json({
                error: true,
                message: "You already reviewed this product",
            });
        }

        const review = await reviewModel.create({
            productId,
            userId,
            rating,
            comment,
        });

        // recalculate Product rating
        const reviews = await reviewModel.find({ productId });
        const totalRating = reviews.reduce((acc, item) => acc + item.rating, 0) + product.rating * product.review_count;
        const avgRating = totalRating / (reviews.length + product.review_count);

        product.rating = avgRating.toFixed(1);
        product.review_count = reviews.length + product.review_count;

        await product.save();

        return res.status(200).json({
            success: true,
            review,
        })

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message || "Server Error",
        })
    }
}

export const getProductReviews = async (req, res) => {
    try {
        const productId = req.params.id;

        const reviews = await reviewModel
        .find({ productId })
        .sort({ createdAt: -1 })
        .populate('userId');

        return res.status(200).json({
            success: true,
            reviews,
        })

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message || "Server Error",
        })
    }
}