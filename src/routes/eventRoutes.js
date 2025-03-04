const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const authMiddleware = require("../middlewares/authMiddleware");
const { validateEvent } = require("../middlewares/validateRequest");

/**
 * @swagger
 * /api/events/collect:
 *   post:
 *     summary: Collect website analytics events
 *     tags: [Events]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event:
 *                 type: string
 *                 example: "button_click"
 *               url:
 *                 type: string
 *                 example: "https://example.com/page"
 *               referrer:
 *                 type: string
 *                 example: "https://google.com"
 *               device:
 *                 type: string
 *                 enum: ["mobile", "desktop"]
 *               ipAddress:
 *                 type: string
 *                 example: "192.168.1.1"
 *               metadata:
 *                 type: object
 *                 properties:
 *                   browser:
 *                     type: string
 *                     example: "Chrome"
 *                   os:
 *                     type: string
 *                     example: "Android"
 *                   screenSize:
 *                     type: string
 *                     example: "1080x1920"
 *     responses:
 *       201:
 *         description: Event recorded successfully
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized - Missing or invalid API key
 */
router.post("/collect", authMiddleware, validateEvent, eventController.collectEvent);

module.exports = router;
