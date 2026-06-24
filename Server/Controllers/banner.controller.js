import cloudinary from "../Config/cloudinary.js";
import bannerModel from "../models/banner.model.js";
import fs from 'fs';

export async function createBanner(req, res){
    try {
        let imageUrl = "";

        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'banners',
            })
            imageUrl = result.secure_url;
            fs.unlinkSync(req.file.path);
        }

        const banner = bannerModel.create({
            image: imageUrl,
        });

        return res.status(201).json({
            success: true,
            banner,
        })

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message || "Server Error",
        })
    }
}

export async function getBanners(req, res){
    try {
        const banners = await bannerModel.find().sort({ order: 1 });

        return res.status(200).json({
            success: true,
            banners,
        })

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message || "Server Error",
        })
    }
}

export async function deleteBanner(req, res) {
    try {
        const banner = await bannerModel.findById(req.params.id);

        if(!banner){
            return res.status(404).json({
                error: true,
                message: "Banner not found",
            })
        }

        // remove image from cloudinary
        const imgUrl = banner.image;
        
        const urlArr = imgUrl.split("/");
        const image = urlArr[urlArr.length - 1];
        const imageName = image.split(".")[0];

        await cloudinary.uploader.destroy(`banners/${imageName}`);
        await bannerModel.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Banner deleted Successfully",
        });

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message || "Server Error",
        })
    }
}

export async function toggleBanner(req, res){
    try {
        const banner = await bannerModel.findById(req.params.id);

        if(!banner){
            return res.status(404).json({
                error: true,
                message: "Banner not found",
            })
        }

        banner.isActive = !banner.isActive;
        await banner.save();

        return res.status(200).json({
            success: true,
            banner,
        })

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message || "Server Error",
        })
    }
}

export async function updateOrder(req, res){
    try {
        const { order } = req.body;

        await bannerModel.findByIdAndUpdate(req.params.id, {
            order
        });

        return res.status(200).json({
            success: true,
            message: "Banner Order Updated",
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message || "Server Error",
        })
    }
}