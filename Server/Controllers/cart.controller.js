import cartProductModel from "../models/cartProduct.model.js";


export async function getCartItemController(req, res){
    try {
        const userId = req.user.id;

        const cartItems = await cartProductModel
            .find({ userId })
            .populate("productId", "slug title image price")
            .lean();

        const totalAmount = cartItems.reduce(
            (sum, item) => sum + item.totalPrice,
            0
        ); 

        return res.status(200).json({
            success: true,
            data: cartItems,
            totalAmount
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server error",
            success: false,
        });
    }
}

export async function updateCartItemController(req, res){
    try {
        const userId = req.user.id;

        const { productId, quantity, price, title, image, size } = req.body;

        if(!productId){
            return res.status(400).json({
                message: "productId required",
                success: false,
            })
        }

        const query = {
            userId,
            productId,
            size: size || null
        };

        // ✅ ADD TO CART (increment)
        if(quantity === undefined){
            if(!price){
                return res.status(400).json({
                    message: "price required",
                    success: false,
                })
            }

            const existingItem = await cartProductModel.findOne(query);

            if(existingItem){
                existingItem.quantity += 1;
                await existingItem.save();

                return res.status(200).json({
                    success: true,
                    data: existingItem,
                })
            }

            const newItem = await cartProductModel.create({
                ...query,
                quantity: 1,
                price,
                title,
                image,
                totalPrice: price,
            });

            return res.status(200).json({
                success: true,
                data: newItem,
            })
        }

        // ✅ REMOVE ITEM
        if(quantity <= 0){
            await cartProductModel.deleteOne(query);

            return res.status(200).json({
                success: true,
                message: "Item removed"
            })
        }

        // ✅ UPDATE QTY
        let item = await cartProductModel.findOne(query);

        if(!item){
            if(!price){
                return res.status(400).json({
                    message: "price required",
                    success: false,
                })
            }

            item = await cartProductModel.create({
                ...query,
                quantity,
                price,
                title,
                image,
                totalPrice: price * quantity,
            });

            return res.status(200).json({
                success: true,
                data: item,
            });
        }

        item.quantity = quantity;
        item.totalPrice = item.price * quantity;
        await item.save();

        return res.status(200).json({
            success: true,
            data: item,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server error",
            success: false,
        });
    }
}

export async function removeCartItemController(req, res) {
    try {
        const userId = req.user.id;
        const productId = req.params.productId;
        const {size} = req.query;

        await cartProductModel.deleteOne({ userId, productId, size: size || null });

        return res.status(200).json({
            success: true,
            message: "Items removed"
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server error",
            error: true,
            success: false,
        });
    }
}