const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        apiKey: { type: String, required: true }, // Links event to API key
        event: { type: String, required: true }, // e.g., "button_click"
        url: { type: String, required: true },
        referrer: { type: String },
        device: { type: String, required: true }, // "mobile", "desktop"
        ipAddress: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        metadata: {
            browser: { type: String },
            os: { type: String },
            screenSize: { type: String },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
