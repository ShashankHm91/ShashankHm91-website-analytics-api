const apiKeyService = require("../../services/apiKeyService");
const ApiKey = require("../../models/ApiKey");
const { connect, clear, close } = require("../setupTestDB");

beforeAll(async () => await connect());
afterEach(async () => await clear());
afterAll(async () => await close());

describe("API Key Management", () => {
  it("should generate and store an API key", async () => {
    const appName = "TestApp";
    const key = await apiKeyService.createApiKey(appName);

    expect(key).toBeDefined();
    const savedKey = await ApiKey.findOne({ appName });
    expect(savedKey).not.toBeNull();
    expect(savedKey.key).toBe(key);
  });

  it("should fetch an existing API key", async () => {
    const appName = "TestApp";
    await apiKeyService.createApiKey(appName);
    const retrievedKey = await apiKeyService.getApiKey(appName);

    expect(retrievedKey).not.toBeNull();
    expect(retrievedKey.appName).toBe(appName);
  });

  it("should revoke an API key", async () => {
    const appName = "TestApp";
    await apiKeyService.createApiKey(appName);
    const revokedKey = await apiKeyService.revokeApiKey(appName);

    expect(revokedKey.revoked).toBe(true);
  });
});
