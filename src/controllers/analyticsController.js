const analyticsService = require("../services/analyticsService");

exports.getEventSummary = async (req, res) => {
  try {
    const { event, startDate, endDate, app_id } = req.query;

    if (!event) {
      return res.status(400).json({ status: "fail", message: "Event is required" });
    }

    const summary = await analyticsService.getEventSummary({ event, startDate, endDate, appId: app_id });

    res.status(200).json({
      status: "success",
      message: "Event summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    console.error("Error fetching event summary:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.getUserStats = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ status: "fail", message: "User ID is required" });
    }

    const stats = await analyticsService.getUserStats(userId);

    if (!stats) {
      return res.status(404).json({ status: "fail", message: "No data found for this user" });
    }

    res.status(200).json({
      status: "success",
      message: "User stats retrieved successfully",
      data: stats,
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
