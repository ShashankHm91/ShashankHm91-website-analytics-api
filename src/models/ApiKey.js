const mongoose = require("mongoose");
const crypto = require("crypto");

const apiKeySchema = new mongoose.Schema(
  {
    key: { type: String, unique: true, required: true },
    appName: { type: String, required: true },
    revoked: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now, expires: "30d" }, // Auto-delete after 30 days
  },
  { timestamps: true }
);

// Generate a secure API key
apiKeySchema.statics.generateKey = function () {
  return crypto.randomBytes(32).toString("hex");
};

module.exports = mongoose.model("ApiKey", apiKeySchema);
