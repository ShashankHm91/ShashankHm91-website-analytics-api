const eventService = require("../services/eventService");

exports.collectEvent = async (req, res) => {
    try {
        const { event, url, referrer, device, ipAddress, timestamp, metadata } = req.body;

        // Validate required fields
        if (!event || !url || !device || !ipAddress) {
            return res.status(400).json({
                status: "fail",
                message: "Event, URL, device, and IP address are required",
            });
        }

        // Get API key from request (middleware sets this)
        const apiKey = req.apiKey.key;

        // Save the event
        const eventData = { apiKey, event, url, referrer, device, ipAddress, timestamp, metadata };
        await eventService.saveEvent(eventData);

        res.status(201).json({
            status: "success",
            message: "Event recorded successfully",
        });
    } catch (error) {
        console.error("Error collecting event:", error);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
};
