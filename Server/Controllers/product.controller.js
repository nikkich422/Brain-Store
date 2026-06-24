import fs from "fs";
import productModel from "../models/product.model.js";
import redisClient from "../Utils/redis.js";
import cloudinary from "../Config/cloudinary.js";

export async function createProduct(req, res) {
  try {
    let data = { ...req.body };

    if(!data.title || !data.price || !data.stock_count){
      return res.status(400).json({
        error: true,
        message: "Required fields missing",
      })
    }

    // upload images
    let uploadImages = [];
    if(req.files && req.files.length > 0){
      for(const file of req.files){
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "products",
        });

        uploadImages.push(result.secure_url);

        fs.unlinkSync(file.path);
      }
    }

    data.image = uploadImages[0] || "";

    data.price = parseFloat(data.price);
    data.original_price = parseFloat(data.original_price);
    data.stock_count = parseInt(data.stock_count);

    if(typeof data.size === "string"){
      data.size = data.size?.split(",").map((s) => s.trim()).filter(boolean);
    }
    if(typeof data.tags === "string"){
      data.tags = data.tags?.split(",").map((t) => t.trim()).filter(boolean);
    }

    const product = await productModel.create(data);

    const keys = await redisClient.keys(
      "/api/product*"
    );
    
    if (keys.length > 0) {
      await redisClient.del(keys);
    }

    return res.status(200).json({
      success: true,
      message: "Product created Successfully",
      data: product,
    });
  } catch (error) {
    console.log("printing error: ",error);
    return res.status(500).json({
      message: "server error" || error.message,
      success: false,
    });
  }
  // 69f6c994b11cf610ccc391af
}

export async function getSingleProduct(req, res){
  try {
    const id = req.params.id;

    const prodcut = await productModel.findById(id);
    if(!prodcut){
      return res.status(404).json({
        error: true,
        message: "product not found",
      })
    }
    
    return res.status(200).json({
      success: true,
      data: prodcut,
    });

  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message || "Server Error",
    })
  }
}

export async function getProducts(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;

    const cacheKey = `products:${JSON.stringify(req.query)}`;
    const cached = await redisClient.get(cacheKey);

    if(cached){
      return res.json(JSON.parse(cached));
    }

    let filter = {};

    // CATEGORY
    if (req.query.category) {
      filter.category = {
        $in: req.query.category.split(",").map((c) => c.toLowerCase()),
      };
    }

    // SUBCATEGORY (multi-select)
    if (req.query.subCategory) {
      filter.subCategory = {
        $in: req.query.subCategory.split(",").map((c) => c.toLowerCase()),
      };
    }

    // STOCK
    if (req.query.inStock !== undefined) {
      filter.in_stock = req.query.inStock === "true";
    }

    // RATING
    if (req.query.rating) {
      filter.rating = { $gte: Number(req.query.rating) };
    }
    // PRICE RANGE
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};

      if (req.query.minPrice) {
        filter.price.$gte = Number(req.query.minPrice);
      }

      if (req.query.maxPrice) {
        filter.price.$lte = Number(req.query.maxPrice);
      }
    }
    if (filter.price && Object.keys(filter.price).length === 0) {
      delete filter.price;
    }

    const synonyms = {
      // FOOTWEAR
      chappal: ["flipflop", "slipper", "sandals"],
      slipper: ["flipflop", "chappal", "slides"],
      flipflop: ["slipper", "chappal", "slides"],
      sandals: ["chappal", "slipper"],
      shoes: ["sneakers", "footwear", "boots"],
      sneakers: ["shoes", "casual shoes"],
      boots: ["shoes"],
    
      // CLOTHING (MEN)
      pants: ["trousers", "jeans", "bottomwear"],
      trousers: ["pants"],
      sweatshirt: ["hoodie", "pullover"],
      hoodie: ["sweatshirt"],
    
      // CLOTHING (WOMEN)
      saree: ["sari", "traditional wear"],
      dress: ["gown", "onepiece"],
      gown: ["dress"],
      kurti: ["ethnic wear"],
    
      // WATCHES
      watch: ["wrist watch", "timepiece"],
      smartwatch: ["smart watch", "fitness watch"],
    
      // JEWELLERY
      jewellery: ["jewelry", "ornaments", "accessories"],
      necklace: ["chain"],
      ring: ["band"],
    
      // HOME
      bedsheet: ["bed cover", "bedspread"],
      sofa: ["couch", "seat"],
    
      // FOOD
      food: ["snacks", "gourmet"],
      snacks: ["chips", "namkeen"],
    
      // KIDS
      kids: ["children", "baby"],
    
      // GENERAL
      bag: ["handbag", "backpack"],
    };
    
    // SEARCH (text index)
    if (req.query.search && req.query.search !== "") {
      const rawSearch = req.query.search.toLowerCase();

      // split words
      const words = rawSearch.split(" ");
      let searchWords = [];

      words.forEach((word) => {
        searchWords.push(word);

        if(synonyms[word]){
          searchWords.push(...synonyms[word]);
        }
      });

      // remove duplicate
      searchWords = [...new Set(searchWords)];

      filter.$or = searchWords.flatMap((word) => [
        { title: { $regex: word, $options: "i"} },
        { brand: { $regex: word, $options: "i"} },
        { category: { $regex: word, $options: "i"} },
        { subCategory: { $regex: word, $options: "i"} },
        { tags: { $in: [new RegExp(word, "i")]} },
      ]);
    }
    // SORTING
    let sortOption = { 
      rating: -1, 
      review_count: -1, 
      createdAt: -1 
    };

    switch (req.query.sortBy) {
      case "price_asc":
        sortOption = { price: 1 };
        break;
      case "price_desc":
        sortOption = { price: -1 };
        break;
      case "rating":
        sortOption = { rating: -1 };
        break;
      case "newest":
        sortOption = { createdAt: -1 };
        break;
    }

    // TOTAL COUNT
    const totalProducts = await productModel.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / perPage);

    if (page > totalPages && totalPages !== 0) {
      return res.status(404).json({
        message: "Page not found",
        success: false,
      });
    }

    // DATA FETCH
    let products = await productModel
      .find(filter)
      .sort(sortOption)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .lean();

    // if(req.query.search){
    //   const fuse = new Fuse(products, {
    //     keys: ["title", "brand", "category", "tags"],
    //     threshold: 0.4,
    //   })

    //   const result = fuse.search(req.query.search);
    //   if(result.length > 0){
    //     products = result.map((r) => r.item);
    //   }
    // }

    await redisClient.setEx(
      cacheKey,
      60 * 5, // 5 minutes
      JSON.stringify({
        data: products,
        totalProducts,
        totalPages,
        page,
        success: true,
      })
    )

    return res.status(200).json({
      data: products,
      pagination: {
        page,
        totalPages,
        totalProducts,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
      success: true,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}

/** 
    All Products
    /products

    Category ID
    /products?catId=123

    Category Name
    /products?catName=Electronics

    Sub Category
    /products?subCatId=456

    Third Level
    /products?thirdSubCatId=789

    Price Filter
    /products?minPrice=10000&maxPrice=50000

    Rating
    /products?rating=4

    Featured
    /products?featured=true

    Combo Query (REAL USE CASE)
    /products?catId=123&minPrice=10000&rating=4&page=1
*/

export async function deleteProduct(req, res) {
  const product = await productModel
    .findById(req.params.id)
    .populate("category");

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
      error: true,
      success: false,
    });
  }

  const img = product.image;
  const imgUrl = img;
  const urlArr = imgUrl.split("/");
  const image = urlArr[urlArr.length - 1];

  const imageName = image.split(".")[0];

  if (imageName) {
    await cloudinary.uploader.destroy(imageName);
  }

  const deletedProduct = await productModel.findByIdAndDelete(req.params.id);

  if (!deletedProduct) {
    return res.status(404).json({
      error: true,
      message: "Something went wrong to delete Product.",
    });
  }

  const keys = await redisClient.keys(
    "/api/product*"
  );
  
  if (keys.length > 0) {
    await redisClient.del(keys);
  }

  return res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
}

export async function getProductBySlug(req, res) {
  try {
    const { slug } = req.params;

    const product = await productModel.findOne({ slug });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    const reletedProducts = await productModel
      .find({
        subCategory: product.subCategory,
        _id: { $ne: product._id }, // exclude current product
        in_stock: true,
      })
      .limit(5)
      .lean();

    return res.status(200).json({
      data: product,
      reletedProducts,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function removeImageFromCloudinary(req, res) {
  try {
    const imgUrl = req.query.img;

    const urlArr = imgUrl.split("/");
    const image = urlArr[urlArr.length - 1];

    const imageName = image.split(".")[0];

    if (imageName) {
      const result = await cloudinary.uploader.destroy(imageName);
      if (result) {
        res.status(200).send(result);
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function updateProduct(req, res) {
  try {
    const id = req.params.id;

    let updateData = {...req.body};

    // Upload new images if exists
    if(req.files && req.files.length > 0){
      const file = req.files[0];

      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'products',
      })

      updateData.image = result.secure_url;

      fs.unlinkSync(file.path);
    }

    // Convert fields
    if(updateData.price){
      updateData.price = Number(updateData.price);
    }
    if(updateData.stock_count){
      updateData.stock_count = Number(updateData.stock_count);
    }
    if(updateData.size){
      updateData.size = updateData.size.split(",").map((s) => s.trim());
    }
    if(updateData.tags){
      updateData.tags = updateData.tags.split(",").map((t) => t.trim());
    }

    const product = await productModel.findByIdAndUpdate(
      id,
      {$set: updateData},
      {new: true}
    );

    const keys = await redisClient.keys(
      "/api/product*"
    );
    
    if (keys.length > 0) {
      await redisClient.del(keys);
    }

    return res.json({
      success: true,
      data: product,
    })

  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    })
  }
}
