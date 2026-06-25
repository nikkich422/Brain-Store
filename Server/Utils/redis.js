import { createClient } from "redis";

const redisClient = createClient({
    url: process.env.REDIS_URL,
});

redisClient.on("error", (err) =>
    console.error("Redis Error:", err)
);

try {
    await redisClient.connect();
    console.log("Redis Connected");
} catch (error) {
    console.log("Redis not connected, continuing without cache");
}

export default redisClient;