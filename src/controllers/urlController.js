const urlService = require('../services/urlService');

exports.shortenUrl = async (req, res) => {
    try {
        const { longUrl } = req.body;
        const alreadyExists = await urlService.checkIfAlreadyExists(longUrl);
        if(alreadyExists) res.status(404).json({ error: 'URL already exists' });
        else{
            const shortenedUrl = await urlService.createShortenUrl(longUrl);
            res.json({ shortenedUrl });
        }
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
};

exports.redirectURL = async (req, res) => {
    try {
        const { shortUrl } = req.body;
        const id = await urlService.extractIdFromShortUrl(shortUrl);
        const longUrl = await urlService.fetchData(id);
        if (longUrl) res.json({ longUrl: longUrl });
        else res.status(404).json({ error: 'URL not found' });
    } catch (error) {
        res.status(404).json({ error: 'URL not found' });
    }
};