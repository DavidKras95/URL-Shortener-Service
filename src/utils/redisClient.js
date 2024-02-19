
const Redis = require('redis');
require("dotenv").config();

const client = Redis.createClient({
    username: process.env.REDIS_USER_NAME,
    password: process.env.REDIS_PASSWORD,
    url: process.env.REDIS_URI
});

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

module.exports = redisClient;