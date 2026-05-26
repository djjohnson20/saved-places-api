const request = require("supertest");
const app = require("../src/app");

describe("POST /auth/login", () => {
  it("should return 400 if email or password is missing", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "",
      password: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email and password are required");
  });
});
