import wishlistModel from "../models/wishlist.model.js";

export async function toggleFavorite(req, res){
    try {
        const userId = req.user.id;

        const { productId } = req.body;

        let wishlist = await wishlistModel.findOne({ userId });
        if(!wishlist){
            wishlist = new wishlistModel({
                userId,
                products: [productId],
            })
        }else{
            const exists = wishlist.products.some(
                (id) => id.toString() === productId
            );

            if(exists){
                wishlist.products = wishlist.products.filter(
                    (id) => id.toString() !== productId
                )
            }
            else{
                wishlist.products.push(productId);
            }
        }

        await wishlist.save();
        await wishlist.populate('products');

        return res.status(200).json({
            success: true,
            products: wishlist.products,
        })

    } catch (error) {
        return res.status(500).json({
            error: true,
            error: error.message || error,
        })
    }
}

export async function getFavorites(req, res){
    try {
        const userId = req.user.id;

        const wishlist = await wishlistModel.findOne({ userId })
            .populate('products')
            .lean();

        return res.status(200).json({
            success: true,
            data: wishlist?.products || [],
        })

    } catch (error) {
        return res.status(500).json({
            error: true,
            error: error.message || error,
        })
    }
}