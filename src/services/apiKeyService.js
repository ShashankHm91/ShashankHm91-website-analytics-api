const ApiKey = require("../models/ApiKey");

// Generate and save a new API key
exports.createApiKey = async (appName) => {
  const key = ApiKey.generateKey();
  const newKey = new ApiKey({ key, appName });
  await newKey.save();
  return key;
};

// Retrieve an API key by app name
exports.getApiKey = async (appName) => {
  return await ApiKey.findOne({ appName, revoked: false });
};

// Revoke an API key
exports.revokeApiKey = async (appName) => {
  return await ApiKey.findOneAndUpdate({ appName }, { revoked: true }, { new: true });
};

// Validate an API key
exports.validateApiKey = async (key) => {
  return await ApiKey.findOne({ key, revoked: false });
};
