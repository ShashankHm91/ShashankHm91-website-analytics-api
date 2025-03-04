const apiKeyService = require("../services/apiKeyService");

module.exports = async (req, res, next) => {
    try {
        const apiKey = req.header("x-api-key");
        if (!apiKey) {
            return res.status(401).json({ status: "fail", message: "API key required" });
        }

        const validKey = await apiKeyService.validateApiKey(apiKey);
        if (!validKey) {
            return res.status(403).json({ status: "fail", message: "Invalid or revoked API key" });
        }

        req.apiKey = validKey; // Attach API key data to request
        next();
    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};
