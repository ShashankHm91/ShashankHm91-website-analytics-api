const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register an app and generate an API key
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               appName:
 *                 type: string
 *                 example: "MyWebsite"
 *     responses:
 *       201:
 *         description: API key generated successfully
 *       400:
 *         description: App name is required or API key already exists
 */
router.post("/register", authController.registerApp);

/**
 * @swagger
 * /api/auth/api-key:
 *   get:
 *     summary: Retrieve API key for an app
 *     tags: [Authentication]
 *     parameters:
 *       - name: appName
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: API key retrieved successfully
 *       400:
 *         description: App name is required
 *       404:
 *         description: API key not found
 */
router.get("/api-key", authController.getApiKey);

/**
 * @swagger
 * /api/auth/revoke:
 *   post:
 *     summary: Revoke an API key
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               appName:
 *                 type: string
 *     responses:
 *       200:
 *         description: API key revoked successfully
 *       400:
 *         description: App name is required
 *       404:
 *         description: API key not found
 */
router.post("/revoke", authController.revokeApiKey);

module.exports = router;
