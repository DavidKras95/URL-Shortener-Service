const Redis = require("redis");
require("dotenv").config();

const redisClient = Redis.createClient({
  url: process.env.REDIS_URI
});

redisClient.on("error", (error) => {
  console.error("Redis error:", error);
});

redisClient.connect("connect", () => {
  console.log("Redis client connected");
});

redisClient.on("end", () => {
  console.log("Redis client closed");
});

module.exports = redisClient;
