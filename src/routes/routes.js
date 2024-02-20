const express = require("express");
const UrlController = require("../controllers/urlController");
const validateInput = require("../middleware/validateInput"); // Import the middleware
const router = express.Router();

router.post("/shortenUrl", validateInput, UrlController.shortenUrl); // Include the middleware before the route handler
router.get("/:shortUrl", UrlController.redirectURL);

module.exports = router;