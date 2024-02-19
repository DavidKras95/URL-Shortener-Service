
const urlService = require('../services/urlService');

exports.shortenUrl = async (req, res) => {
    try {
        const { longUrl } = req.body; 
        const shortenedUrl = await urlService.shortenUrl(longUrl);
        res.json({ shortenedUrl }); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
};

exports.redirectURL = async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const originalUrl = await urlService.getOriginalUrl(shortId);
        res.redirect(originalUrl);
    } catch (error) {
        res.status(404).json({ error: 'URL not found' });
    }
};

