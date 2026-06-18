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

describe("POST /auth/signup", () => {
  it("should create a new user and return a token", async () => {
    const response = await request(app).post("/auth/signup").send({
      email: "test@example.com",
      password: "password123",
      name: "Test User",
    });

    expect(response.status).toBe(201);
    expect(response.body.token).toBeDefined();
    expect(response.body.user.email).toBe("test@example.com");
    expect(response.body.user.name).toBe("Test User");
  });
});

describe("POST /auth/login", () => {
  it("should log in an existing user and return a token", async () => {
    await request(app).post("/auth/signup").send({
      email: "login@example.com",
      password: "password123",
      name: "Login User",
    });

    const response = await request(app).post("/auth/login").send({
      email: "login@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.user.email).toBe("login@example.com");
    expect(response.body.user.name).toBe("Login User");
  });
});

describe("POST /auth/login", () => {
  it("should return 401 for invalid credentials", async () => {
    await request(app).post("/auth/signup").send({
      email: "wrongpass@example.com",
      password: "password123",
      name: "Wrong Pass User",
    });

    const response = await request(app).post("/auth/login").send({
      email: "wrongpass@example.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid credentials");
  });
});

describe("POST /auth/signup", () => {
  it("should return 400 if the email is already in use", async () => {
    await request(app).post("/auth/signup").send({
      email: "duplicate@example.com",
      password: "password123",
      name: "First User",
    });

    const response = await request(app).post("/auth/signup").send({
      email: "duplicate@example.com",
      password: "password123",
      name: "Second User",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email already in use");
  });
});

describe("PATCH /auth/me", () => {
  it("should update the authenticated user's name", async () => {
    const signupResponse = await request(app).post("/auth/signup").send({
      email: "updateme@example.com",
      password: "password123",
      name: "Original Name",
    });

    const token = signupResponse.body.token;

    const response = await request(app)
      .patch("/auth/me")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Updated Name",
      });

    expect(response.status).toBe(200);
    expect(response.body.user.email).toBe("updateme@example.com");
    expect(response.body.user.name).toBe("Updated Name");
    expect(response.body.user.id).toBeDefined();
  });
});

describe("PATCH /auth/me", () => {
  it("should return 400 if no valid fields are provided", async () => {
    const signupResponse = await request(app).post("/auth/signup").send({
      email: "emptyupdate@example.com",
      password: "password123",
      name: "Empty Update User",
    });

    const token = signupResponse.body.token;

    const response = await request(app)
      .patch("/auth/me")
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("No valid fields to update");
  });
});

describe("GET /auth/me", () => {
  it("should return the authenticated user's profile", async () => {
    const signupResponse = await request(app).post("/auth/signup").send({
      email: "getme@example.com",
      password: "password123",
      name: "Get Me User",
    });

    const token = signupResponse.body.token;

    const response = await request(app)
      .get("/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.user.email).toBe("getme@example.com");
    expect(response.body.user.name).toBe("Get Me User");
    expect(response.body.user.id).toBeDefined();
  });
});
