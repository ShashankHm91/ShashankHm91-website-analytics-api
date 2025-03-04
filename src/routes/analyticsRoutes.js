const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /api/analytics/event-summary:
 *   get:
 *     summary: Retrieve event summary analytics
 *     tags: [Analytics]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - name: event
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *       - name: startDate
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *       - name: endDate
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Event summary retrieved successfully
 *       400:
 *         description: Event parameter is missing
 */
router.get("/event-summary", authMiddleware, analyticsController.getEventSummary);

/**
 * @swagger
 * /api/analytics/user-stats:
 *   get:
 *     summary: Retrieve user statistics
 *     tags: [Analytics]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - name: userId
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User stats retrieved successfully
 *       400:
 *         description: User ID is required
 *       404:
 *         description: No data found for this user
 */
router.get("/user-stats", authMiddleware, analyticsController.getUserStats);

module.exports = router;
