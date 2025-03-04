const request = require("supertest");
const app = require("../../app");
const { connect, clear, close } = require("../setupTestDB");

beforeAll(async () => await connect());
afterEach(async () => await clear());
afterAll(async () => await close());

describe("Auth API Endpoints", () => {
    it("should register an app and generate an API key", async () => {
        const response = await request(app)
            .post("/api/auth/register")
            .send({ appName: "TestApp" });

        expect(response.status).toBe(201);
        expect(response.body.status).toBe("success");
        expect(response.body.data.apiKey).toBeDefined();
    });

    it("should fetch an API key", async () => {
        await request(app).post("/api/auth/register").send({ appName: "TestApp" });

        const response = await request(app)
            .get("/api/auth/api-key?appName=TestApp");

        expect(response.status).toBe(200);
        expect(response.body.data.apiKey).toBeDefined();
    });

    it("should revoke an API key", async () => {
        await request(app).post("/api/auth/register").send({ appName: "TestApp" });

        const response = await request(app)
            .post("/api/auth/revoke")
            .send({ appName: "TestApp" });

        expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
    });
});
