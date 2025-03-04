const { body, validationResult } = require("express-validator");

exports.validateEvent = [
  body("event").notEmpty().withMessage("Event name is required"),
  body("url").isURL().withMessage("Valid URL is required"),
  body("device").isIn(["mobile", "desktop"]).withMessage("Device must be 'mobile' or 'desktop'"),
  body("ipAddress").isIP().withMessage("Valid IP address is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "fail", errors: errors.array() });
    }
    next();
  },
];
