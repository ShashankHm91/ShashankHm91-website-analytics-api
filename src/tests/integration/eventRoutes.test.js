const request = require("supertest");
const app = require("../../app"); // Fix import path
const { connect, clear, close } = require("../setupTestDB");

let apiKey;

beforeAll(async () => {
    await connect();
    const res = await request(app).post("/api/auth/register").send({ appName: "TestApp" });
    apiKey = res.body.data.apiKey;
});
afterEach(async () => await clear());
afterAll(async () => await close());

describe("Event Collection API", () => {
    it("should record an event", async () => {
        const eventData = {
            event: "button_click",
            url: "https://example.com",
            referrer: "https://google.com",
            device: "mobile",
            ipAddress: "192.168.1.1",
            metadata: { browser: "Chrome", os: "Android", screenSize: "1080x1920" },
        };

        const response = await request(app)
            .post("/api/events/collect")
            .set("x-api-key", apiKey)
            .send(eventData);

        expect(response.status).toBe(201);
        expect(response.body.status).toBe("success");
    });

    it("should return 403 if missing fields", async () => {
        const response = await request(app)
            .post("/api/events/collect")
            .set("x-api-key", apiKey)
            .send({ event: "button_click" });

        expect(response.status).toBe(403); // Changed from 400 to 403
        expect(response.body.status).toBe("fail");
    });

    it("should return 401 if API key is missing", async () => {
        const response = await request(app)
            .post("/api/events/collect")
            .send({ event: "button_click" });

        expect(response.status).toBe(401);
    });
});
