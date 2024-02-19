const Redis = require('redis');
require("dotenv").config();

const redisClient = Redis.createClient({
    username: process.env.REDIS_USER_NAME,
    password: process.env.REDIS_PASSWORD,
    url: process.env.REDIS_URI2
});

redisClient.on('error', (error) => {
    console.error('Redis error:', error);
});

redisClient.connect('connect', () => {
    
    console.log('Redis client connected');
});

redisClient.on('end', () => {
    console.log('Redis client closed');
});

module.exports = redisClient;