const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.registerApp);
router.get("/api-key", authController.getApiKey);
router.post("/revoke", authController.revokeApiKey);

module.exports = router;
