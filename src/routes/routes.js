const express = require("express");
const UrlController = require("../controllers/urlController")
const router = express.Router();

router.post("/shortenUrl", UrlController.shortenUrl);
router.get("/:shortUrl", UrlController.redirectURL);

module.exports = router;
