const { validationResult } = require('express-validator');

const isValidUrl = (url) => {

    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
};

const checkInputUrl = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { longUrl } = req.body;
    if (!longUrl) {
        return res.status(400).json({ error: 'URL is required', shortenedUrl: ""  });
    }

    if (!isValidUrl(longUrl)) {
        return res.status(400).json({ error: 'Invalid URL format', shortenedUrl: ""  });
    }

    next(); 
};

module.exports = checkInputUrl;
