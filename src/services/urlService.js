const nanoid = require('nanoid');
const Url = require('../models/url');
const redisClient = require('../utils/redisClient');

exports.shortenUrl = async (originalUrl) => {
    const shortId = nanoid.nanoid(7);
    await Url.create({ originalUrl, shortId });
    await redisClient.set(shortId, originalUrl);
    return `${process.env.BASE_URL}/${shortId}`;
};

exports.getOriginalUrl = async (shortId) => {
    let originalUrl = await redisClient.get(shortId);
    if (!originalUrl) {
        const url = await Url.findOne({ shortId });
        if (url) {
            originalUrl = url.originalUrl;
            await redisClient.set(shortId, originalUrl);
        } else {
            throw new Error('URL not found');
        }
    }
    return originalUrl;
};