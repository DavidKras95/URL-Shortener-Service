const urlModel = require("../models/url");
const redisClient = require("../utils/redisClient");
let nanoid = null;
import("nanoid").then((module) => {
  nanoid = module.nanoid;
});

exports.createShortenUrl = async (longUrl) => {
  let shortId;
  let isUnique = false;
  // Generate unique shortId
  while (!isUnique) {
    shortId = nanoid(process.env.NUMBER_OF_UNIQUE, 10);
    const existingUrl = await urlModel.findOne({ id: shortId });
    if (!existingUrl) {
      isUnique = true;
    }
  }
  const shortUrl = `${process.env.BASE_URL}${process.env.NGINX_DISPLAY_PORT}/${shortId}`;
  await urlModel.create({
    id: shortId,
    longUrl: longUrl,
    shortUrl: shortUrl,
    date: new Date(),
  });
  await redisClient.set(shortId, longUrl);
  return shortUrl;
};

exports.fetchData = async (id) => {
  let longUrlRedis = await redisClient.get(id);
  if (!longUrlRedis) {
    const dbResponse = await Url.findOne({ id: id });
    if (dbResponse) {
      await redisClient.set(id, dbResponse.longUrl);
      return dbResponse.longUrl;
    } else throw new Error("URL not found");
  }
  return longUrlRedis;
};

exports.extractIdFromShortUrl = async (shortUrl) => {
  try {
    const parts = shortUrl.split("/");
    const id = parts[parts.length - 1];
    return id;
  } catch (error) {
    res.status(404).json({ error: "Id not extracted" });
  }
};

exports.checkIfAlreadyExists = async (longUrl) => {
  const dbResponse = await urlModel.findOne({ longUrl: longUrl });
  if (dbResponse) {
    await redisClient.set(dbResponse.id, dbResponse.longUrl);
    return dbResponse.shortUrl;
  }
  return null;
};
