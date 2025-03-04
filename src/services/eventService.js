const Event = require("../models/Event");

// Save an event to the database
exports.saveEvent = async (eventData) => {
    const event = new Event(eventData);
    await event.save();
    return event;
};
