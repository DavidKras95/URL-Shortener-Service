let nanoid = null;
import('nanoid').then(module => {
    nanoid = module.nanoid;
});

const Url = require('../models/url');
const redisClient = require('../utils/redisClient');

exports.createShortenUrl = async (longUrl) => {
    const shortId = nanoid(7);
    let shortUrl = `${process.env.BASE_URL}/${shortId}`;
    await Url.create({
         id: shortId,
         longUrl: longUrl,
         shortUrl: shortUrl,
         date: new Date() });
    await redisClient.set(shortId, longUrl, shortUrl);
    return shortUrl;
};

exports.fetchData = async (id) => {
    let longUrlRedis = await redisClient.get(id);
    if (!longUrlRedis) {
        const mongoResult = await Url.findOne({ id : id });
        if (mongoResult){
            await redisClient.set(id, mongoResult.longUrl);
            return mongoResult.longUrl ;
        } 
        else throw new Error('URL not found');
    }
    return longUrlRedis;
};

exports.extractIdFromShortUrl = async (shortUrl) => {
    try{
        const parts = shortUrl.split('/');
        const id = parts[parts.length - 1];
        return id;
    } catch (error){
        res.status(404).json({ error: 'Id not extracted' });
    }
};

exports.checkIfAlreadyExists = async (longUrl) => {
    const mongoResult = await Url.findOne({ longUrl : longUrl });
    if (mongoResult){
        await redisClient.set(mongoResult.id, mongoResult.longUrl);
        return mongoResult.longUrl ;
    } 
    return null;
};