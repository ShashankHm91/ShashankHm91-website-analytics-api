const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const rateLimiter = require("./middlewares/rateLimiter");
const setupSwagger = require("./config/swagger");
require("dotenv").config();

const app = express();

// Security Middleware
app.use(cors({
    origin: ["https://yourfrontend.com", "http://localhost:3000"],
    methods: "GET,POST",
    allowedHeaders: ["x-api-key", "Content-Type"],
}));
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "same-origin" },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
}));
app.use(compression());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/", rateLimiter); // Apply rate limiting

// Import Routes
const eventRoutes = require("./routes/eventRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/events", eventRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/auth", authRoutes);

// Health Check Route
app.get("/healthz", (req, res) => {
    res.status(200).json({ status: "healthy" });
});

app.get("/", (req, res) => {
    res.send(
        `<h4>Website Analytics API is running 🚀</h4><br>
       <b>Available APIs:</b> <br>
       - /api/auth<br>
        - /api/events<br>
        - /api/analytics`
    );
});


// Swagger API
setupSwagger(app);

module.exports = app;
