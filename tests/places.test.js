const request = require("supertest");
const app = require("../src/app");

describe("GET /places", () => {
  it("should return 401 if no token is provided", async () => {
    const response = await request(app).get("/places");

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("No token provided");
  });
});

describe("GET /places/:id", () => {
  it("should return 401 if no token is provided", async () => {
    const response = await request(app).get("/places/abc123");

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("No token provided");
  });
});
