let nanoid = null;

// Check
import('nanoid').then(module => {
    nanoid = module.nanoid;
});

const urlModel = require('../models/url');
const redisClient = require('../utils/redisClient');

exports.createShortenUrl = async (longUrl) => {
    //Generate unique + casting the env to Integer
    const shortId = nanoid(process.env.NUMBER_OF_UNIQUE, 10); 

    // check if ID is exsits 
    let shortUrl = `${process.env.BASE_URL}${process.env.NGINX_DISPLAY_PORT}/${shortId}`;
    await urlModel.create({
         id: shortId,
         longUrl: longUrl,
         shortUrl: shortUrl,
         date: new Date() });
     await redisClient.set(shortId, longUrl);
    //await redisClient.set(shortUrl, longUrl);
    return shortUrl;
};

exports.fetchData = async (id) => {
    //change to short url
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
    const mongoResult = await urlModel.findOne({ longUrl : longUrl });
    if (mongoResult){
        await redisClient.set(mongoResult.id, mongoResult.longUrl);
        return mongoResult.shortUrl ;
    } 
    return null;
};