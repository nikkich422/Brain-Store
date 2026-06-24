import redisClient from "../Utils/redis.js";


const cache = (duration = 300) => {
  return async (req, res, next) => {
    try {
      const key = req.originalUrl;

      const cachedData =
        await redisClient.get(key);

      if (cachedData) {
        return res.status(200).json(
          JSON.parse(cachedData)
        );
      }

      res.sendResponse = res.json;

      res.json = async (body) => {
        await redisClient.setEx(
          key,
          duration,
          JSON.stringify(body)
        );

        res.sendResponse(body);
      };

      next();
    } catch (error) {
      next();
    }
  };
};

export default cache;