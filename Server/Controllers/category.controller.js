
import fs from 'fs';
import categoryModel from '../models/category.model.js';
import mongoose from 'mongoose';
import productModel from '../models/product.model.js';
import cloudinary from '../Config/cloudinary.js';
import { getPublicId } from '../Utils/cloudinary.js';

export async function uploadImages(req, res){
    try {
        const imagesArr = [];
        
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: false,
        }

        for(const img of req.files) {
            const result = await cloudinary.uploader.upload(img.path, options);

            imagesArr.push(result.secure_url);
            fs.unlinkSync(img.path);
        }

        return res.status(200).json({
            images: imagesArr
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

// export async function createCategory(req, res){
//     try {
//         console.log("createCategory controller hit");

//         const existing =
//         await categoryModel.findOne({
//             name: {
//                 $regex: new RegExp(
//                     `^${req.body.name.trim()}$`,
//                     "i"
//                 )
//             }
//         });

//         if(existing){
//             return res.status(400).json({
//                 success: false,
//                 message: "Category already exists",
//             })
//         }

//         let parentName = null;

//         if(req.body.parentId){
//             const parent = await categoryModel.findById(req.body.parentId);
//             parentName = parent?.name || null;
//         }

//         let category = new categoryModel({
//             name: req.body.name,
//             images: req.body.images || [],
//             parentId: req.body.parentId,
//             parentName,
//         })

//         if(!category){
//             return res.status(500).json({
//                 message: "Category not created.",
//                 error: true,
//                 success: false
//             })
//         }

//         category = await category.save();

//         return res.status(200).json({
//             message: "Category created",
//             success: true,
//             error: false,
//         })

//     } catch (error) {
//         return res.status(500).json({
//             message: error.message || error,
//             error: true,
//             success: false,
//         })
//     }
// }

export async function createCategory(req, res){
    try {

        const existing = await categoryModel.findOne({
            name: {
                $regex: new RegExp(
                    `^${req.body.name.trim()}$`,
                    "i"
                )
            }
        });

        let parentName = null;

        if(req.body.parentId){
            const parent = await categoryModel.findById(req.body.parentId);

            parentName = parent?.name || null;
        }

        let category = new categoryModel({
            name: req.body.name,
            images: req.body.images || [],
            parentId: req.body.parentId,
            parentName,
        });

        category = await category.save();

        return res.status(200).json({
            message: "Category created",
            success: true,
            error: false,
        });

    } catch(error){
        console.log("CREATE ERROR:", error);

        return res.status(500).json({
            message: error.message,
            error: true,
            success: false,
        });
    }
}

export async function getCategories(req,res){
    try {

        const categories = await categoryModel
            .find()
            .lean()
            .sort({ createdAt:-1 });

        return res.status(200).json({
            success: true,
            data: categories
        });

    } catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export async function getCategoryCount(req, res){
    try {
        const categoryCount = await categoryModel.countDocuments({parentId: null});

        return res.status(200).json({
            categoryCount,
            success: true,
            error: false,
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

export async function getSubCategoryCount(req, res){
    try {
        const subCategoriesCount = await categoryModel.countDocuments({
            parentId: { $ne: null }
        });

        return res.status(200).json({
            subCategoriesCount,
            success: true,
            error: false,
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
} 


export async function getCategory(req, res){
    try {
        const category = await categoryModel.findById(req.params.id);

        if(!category){
            return res.status(404).json({
                message: 'Category not found',
                error: true,
                success: false
            })
        }

        return res.status(200).json({
            category: category,
            success: true,
            error: false,
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}


export async function removeImageFromCloudinary(req, res){
    try {
        const imgUrl = req.query.img;
    
        const urlArr = imgUrl.split('/');
        const image = urlArr[urlArr.length-1];
    
        if(image){
            const result = await cloudinary.uploader.destroy(
                getPublicId(image)
            );
            if(result){
                res.status(200).send(result);
            }    
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// export async function deleteCategory(req, res){
//     try {
//         const category = await categoryModel.findById(req.params.id);
//         if(!category){
//             return res.status(404).json({
//                 message: "Category not found",
//                 success:false,
//                 error:true
//             })
//         }

//         const images = category.images;

//         for(let img of images){
//             const imgUrl = img;
//             const urlArr = imgUrl.split('/');
//             const imageName = urlArr[urlArr.length-1].split(".")[0];

//             await cloudinary.uploader.destroy(imageName);
//         }

//         const subCategories = await categoryModel.find({ parentId: req.params.id });

//         for(let sub of subCategories){

//             const third = await categoryModel.find({ parentId: sub._id });

//             for(let item of third){
//                 await categoryModel.findByIdAndDelete(item._id);
//             }

//             await categoryModel.findByIdAndDelete(sub._id);
//         }

//         await categoryModel.findByIdAndDelete(req.params.id);

//         return res.status(200).json({
//             message: "Category deleted",
//             success: true,
//             error: false,
//         })

//     } catch (error) {
//         return res.status(500).json({
//             message: error.message || error,
//             error: true,
//             success: false,
//         })
//     }
// }

export async function deleteCategory(req, res){
    try {
        const categoryId = new mongoose.Types.ObjectId(req.params.id);

        const tree = await categoryModel.aggregate([
            {
                $match:{ _id: categoryId }
            },
            {
                $graphLookup:{
                    from:"categories",
                    startWith:"$_id",
                    connectFromField:"_id",
                    connectToField:"parentId",
                    as:"descendants"
                }
            }
        ]);

        if(!tree.length){
            return res.status(404).json({
                message:"Category not found",
                success:false,
                error:true
            })
        }

        const ids = [
            tree[0]._id,
            ...tree[0].descendants.map(cat => cat._id)
        ];

        const categories = await categoryModel.find({
            _id:{ $in: ids }
        });

        for(let cat of categories){
            for(let img of cat.images){

                const urlArr = img.split('/');
                const image = urlArr[urlArr.length-1];

                await cloudinary.uploader.destroy(
                    getPublicId(image)
                );
            }
        }

        await productModel.deleteMany({
            category: {
                $in: categories.map(c => c.name.toLowerCase())
            }
        });

        await categoryModel.deleteMany({
            _id: { $in: ids }
        });

        return res.status(200).json({
            message:"Category and all subcategories deleted",
            success:true,
            error:false
        });

    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
            success:false,
            error:true
        });
    }
}

export async function updatedCategory(req, res){
    try {

        if(req.body.parentId === req.params.id){
            return res.status(400).json({
              success: false,
              message: "Category cannot be its own parent"
            });
        }

        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({
              success:false,
              message:"Invalid category id"
            });
        }

        let parentName = null;

        if(req.body.parentId){
            const tree = await categoryModel.aggregate([
                {
                    $match:{
                        _id:new mongoose.Types.ObjectId(
                            req.params.id
                        )
                    }
                },
                {
                    $graphLookup:{
                        from:"categories",
                        startWith:"$_id",
                        connectFromField:"_id",
                        connectToField:"parentId",
                        as:"descendants"
                    }
                }
            ]);
        
            const descendantIds =
                tree[0].descendants.map(
                    item => String(item._id)
                );
        
            if(
                descendantIds.includes(
                    String(req.body.parentId)
                )
            ){
                return res.status(400).json({
                    success:false,
                    message:
                    "Cannot move category inside its own child"
                });
            }

            const parent = await categoryModel.findById(
                req.body.parentId
            );
        
            parentName = parent?.name || null;
        }

        const category =
            await categoryModel.findByIdAndUpdate(
                req.params.id,
                {
                    name: req.body.name,
                    parentId: req.body.parentId || null,
                    parentName,
                    images: req.body.images || [],
                },
                {
                    new: true,
                }
            );

        if(!category){
            return res.status(404).json({
                success:false,
                message:"Category not found",
            });
        }

        return res.status(200).json({
            success:true,
            category,
        });

    } catch(error){

        return res.status(500).json({
            success:false,
            message:error.message,
        });

    }
}

export async function getParentCategories(req, res){
    try {
        const categories = await categoryModel
        .find({
            parentId: null,
            isActive: true,
        })
        .select("_id name");

        return res.status(200).json({
            success: true,
            data: categories,
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function getCategoryTree(req, res){
    try {
        const categories = await categoryModel.find();

        const buildTree = (parentId = null) => {
            return categories
              .filter(cat => {
                if (parentId === null) {
                  return cat.parentId === null;
                }
                return String(cat.parentId) === String(parentId);
            })
            .map(cat => ({
                ...cat.toObject(),
                children: buildTree(cat._id),
            }));
        };
            
        return res.json({
            success: true,
            data: buildTree(),
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export async function toggleCategoryStatus(req, res){
    try {
        const category = await categoryModel.findById(req.params.id);

        if(!category){
            return res.status(404).json({
                success: false,
                message: "Categories not found",
            })
        }

        category.isActive = !category.isActive;

        await category.save();

        return res.status(200).json({
            success: true,
            message: "Status Updated",
            category,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}