const Event = require("../models/Event");
const Redis = require("ioredis");
const logger = require("../config/logger");

const redis = new Redis(process.env.REDIS_URL); // Redis instance

// Get event summary (count, unique users, device breakdown)
exports.getEventSummary = async ({ event, startDate, endDate, appId }) => {
    try {
        const cacheKey = `event-summary:${event}:${startDate || "none"}:${endDate || "none"}:${appId || "all"}`;

        // Check if data is cached
        const cachedData = await redis.get(cacheKey);
        if (cachedData) {
            logger.info(`Cache hit for event summary: ${cacheKey}`);
            return JSON.parse(cachedData);
        }

        logger.info(`Cache miss for event summary: ${cacheKey}, fetching from DB`);

        // Build query filters
        const query = { event };
        if (startDate) query.timestamp = { $gte: new Date(startDate) };
        if (endDate) query.timestamp = { ...query.timestamp, $lte: new Date(endDate) };
        if (appId) query.apiKey = appId;

        // Aggregate data
        const stats = await Event.aggregate([
            { $match: query },
            {
                $group: {
                    _id: "$device",
                    count: { $sum: 1 },
                    uniqueUsers: { $addToSet: "$ipAddress" },
                },
            },
        ]);

        // Transform data
        const result = {
            event,
            count: stats.reduce((sum, s) => sum + s.count, 0),
            uniqueUsers: new Set(stats.flatMap(s => s.uniqueUsers)).size,
            deviceData: Object.fromEntries(stats.map(s => [s._id, s.count])),
        };

        // Cache result for 10 minutes
        await redis.setex(cacheKey, 600, JSON.stringify(result));

        return result;
    } catch (error) {
        logger.error("Error fetching event summary:", error);
        throw new Error("Database query failed");
    }
};

// Get user statistics (total events, device details, IP)
exports.getUserStats = async (userId) => {
    try {
        const cacheKey = `user-stats:${userId}`;

        // Check cache
        const cachedData = await redis.get(cacheKey);
        if (cachedData) {
            logger.info(`Cache hit for user stats: ${cacheKey}`);
            return JSON.parse(cachedData);
        }

        logger.info(`Cache miss for user stats: ${cacheKey}, fetching from DB`);

        const events = await Event.find({ ipAddress: userId }).sort({ timestamp: -1 });

        if (!events.length) {
            logger.warn(`No data found for user: ${userId}`);
            return null;
        }

        const latestEvent = events[0];

        const result = {
            userId,
            totalEvents: events.length,
            deviceDetails: latestEvent.metadata || {},
            ipAddress: latestEvent.ipAddress,
        };

        // Cache result for 10 minutes
        await redis.setex(cacheKey, 600, JSON.stringify(result));

        return result;
    } catch (error) {
        logger.error("Error fetching user stats:", error);
        throw new Error("Database query failed");
    }
};

// Clear cache when new event is recorded
exports.invalidateCache = async (event, userId) => {
    try {
        const eventCacheKey = `event-summary:${event}:*`;
        const userCacheKey = `user-stats:${userId}`;

        // Delete cache for event summary and user stats
        const keys = await redis.keys(eventCacheKey);
        if (keys.length > 0) {
            await redis.del(...keys);
            logger.info(`Cleared cache for event summary: ${event}`);
        }

        await redis.del(userCacheKey);
        logger.info(`Cleared cache for user stats: ${userId}`);
    } catch (error) {
        logger.error("Error invalidating cache:", error);
    }
};
