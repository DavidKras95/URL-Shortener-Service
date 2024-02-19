const express = require("express");
const UrlController = require("../controllers/urlController")
const router = express.Router();


router.post("/shortenUrl", UrlController.shortenUrl);
// router.get("/getLongUrl/:shortUrl", UrlController.redirectURL);
router.get("/getLongUrl", UrlController.redirectURL);



module.exports = router;
