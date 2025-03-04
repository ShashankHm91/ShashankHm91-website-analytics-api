const apiKeyService = require("../services/apiKeyService");

// Register an app and generate an API key
const logger = require("../config/logger");

exports.registerApp = async (req, res) => {
    try {
        const { appName } = req.body;
        if (!appName) {
            logger.warn("API key registration failed: App name missing");
            return res.status(400).json({ status: "fail", message: "App name is required" });
        }

        const existingKey = await apiKeyService.getApiKey(appName);
        if (existingKey) {
            logger.warn(`API key already exists for app: ${appName}`);
            return res.status(400).json({ status: "fail", message: "API key already exists" });
        }

        const key = await apiKeyService.createApiKey(appName);
        logger.info(`API key generated for app: ${appName}`);

        return res.status(201).json({ status: "success", message: "API key generated", data: { apiKey: key } });
    } catch (error) {
        logger.error("API key registration error:", error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};


// Retrieve API key for an app
exports.getApiKey = async (req, res) => {
    try {
        const { appName } = req.query;
        if (!appName) {
            return res.status(400).json({
                status: "fail",
                message: "App name is required",
            });
        }

        const apiKey = await apiKeyService.getApiKey(appName);
        if (!apiKey) {
            return res.status(404).json({
                status: "fail",
                message: "API key not found",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "API key retrieved successfully",
            data: { apiKey: apiKey.key },
        });
    } catch (error) {
        console.error("Error retrieving API key:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
};

// Revoke API Key
exports.revokeApiKey = async (req, res) => {
    try {
        const { appName } = req.body;
        if (!appName) {
            return res.status(400).json({
                status: "fail",
                message: "App name is required",
            });
        }

        const updatedKey = await apiKeyService.revokeApiKey(appName);
        if (!updatedKey) {
            return res.status(404).json({
                status: "fail",
                message: "API key not found",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "API key revoked successfully",
        });
    } catch (error) {
        console.error("Error revoking API key:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
};
