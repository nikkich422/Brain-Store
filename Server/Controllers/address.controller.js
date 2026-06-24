import addressModel from "../models/address.model.js";

export async function getAddresses(req, res) {
    try {
        const userId = req.user.id;
        const addresses = await addressModel.find({ userId });

        return res.status(200).json({
            success: true,
            data: addresses,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            error: true,
        })
    }
}

export async function addAddress(req, res) {
    try {
        const userId = req.user.id;
        const count = await addressModel.countDocuments({ userId });
        if(count === 0){
            req.body.isDefault = true;
        }

        const newAddress = await addressModel.create({
            ...req.body,
            userId
        })

        if(req.body.isDefault){
            await addressModel.updateMany(
                { userId, _id: { $ne: newAddress._id } },
                { isDefault: false }
            );
        }

        return res.status(201).json({
            success: true,
            data: newAddress,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            error: true,
        })
    }
}

export async function updateAddress(req, res){
    try {
        const userId = req.user.id;
        const _id = req.params.id;

        const address = await addressModel.findOneAndUpdate(
            { _id, userId },
            req.body,
            { returnDocument: 'after' }
        );

        if(!address){
            return res.status(404).json({
                error: true,
                message: "Address not found",
            })
        }

        if(req.body.isDefault){
            await addressModel.updateMany(
                { userId, _id: { $ne: address._id } },
                { isDefault: false }
            );
        }

        return res.status(200).json({
            success: true,
            data: address,
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            error: true,
        })
    }
}

export async function deleteAddress(req, res) {
    try {
        const userId = req.user.id;
        const address = await addressModel.findOneAndDelete({
            _id: req.params.id,
            userId,
        })

        if(!address){
            return res.status(404).json({
                error: true,
                message: "Address not found",
            })
        }

        if(address.isDefault){
            const nextAddress = await addressModel.findOne({ userId }).sort({ createdAt: -1 });

            if(nextAddress){
                nextAddress.isDefault = true;
                await nextAddress.save();
            }
        }

        return res.status(200).json({
            success: true,
            message: "Address deleted",
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            error: true,
        })
    }
}