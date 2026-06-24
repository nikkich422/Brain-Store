import productModel from "../models/product.model.js";
import redisClient from "../Utils/redis.js";

export async function getSearchSuggestions(req, res){
    try {
        const query = req.query.q?.toLowerCase();

        const cacheKey = `suggestions:${query}`;
        
        const cached = await redisClient.get(cacheKey);
        if(cached){
            return res.json(JSON.parse(cached));
        }

        if(!query){
            return res.json({
                suggestions: [],
                products: [],
            })
        }

        const corrections = {
            chapal: "chappal",
            filp: "flip",
            shooes: "shoes",
        };

        const fixedQuery = query
        .split(" ")
        .map((w) => corrections[w] || w)
        .join(" ");

        const products = await productModel.find({
            $or: [
                { title: { $regex: fixedQuery, $options: "i"} },
                { tags: { $in: [new RegExp(fixedQuery, "i")] }},
                { title: { $regex: fixedQuery, $options: "i"} },
            ]
        })
        .limit(10)
        .lean();

        const suggestionSet = new Set();

        products.forEach((p) => {
            suggestionSet.add(p.title);
        })

        await redisClient.setEx(
            cacheKey,
            60 * 10,
            JSON.stringify({
                suggestions: Array.from(suggestionSet).slice(0, 5),
                products: products.slice(0, 5),
            })
        )

        return res.json({
            suggestions: Array.from(suggestionSet).slice(0, 5),
            products: products.slice(0, 5),
        })

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message,
        })
    }
}