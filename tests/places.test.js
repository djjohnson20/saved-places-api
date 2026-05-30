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

describe("POST /places", () => {
  it("should create a place when a valid token is provided", async () => {
    const signupResponse = await request(app).post("/auth/signup").send({
      email: "placeuser@example.com",
      password: "password123",
      name: "Place User",
    });

    const token = signupResponse.body.token;

    const response = await request(app)
      .post("/places")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Favorite Coffee Shop",
        description: "Great place to work and drink espresso",
        pictureUrl:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Favorite Coffee Shop");
    expect(response.body.description).toBe(
      "Great place to work and drink espresso",
    );
    expect(response.body.pictureUrl).toBe(
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    );
    expect(response.body.user).toBeDefined();
    expect(response.body._id).toBeDefined();
  });
});

describe("GET /places", () => {
  it("should return the authenticated user's places", async () => {
    const signupResponse = await request(app).post("/auth/signup").send({
      email: "getplaces@example.com",
      password: "password123",
      name: "Get Places User",
    });

    const token = signupResponse.body.token;

    await request(app)
      .post("/places")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Neighborhood Coffee Shop",
        description: "Quiet place with good espresso.",
        pictureUrl:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
      });

    const response = await request(app)
      .get("/places")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.page).toBe(1);
    expect(response.body.limit).toBe(10);
    expect(response.body.total).toBe(1);
    expect(response.body.pages).toBe(1);
    expect(response.body.places).toHaveLength(1);
    expect(response.body.places[0].name).toBe("Neighborhood Coffee Shop");
    expect(response.body.places[0].description).toBe(
      "Quiet place with good espresso.",
    );
  });
});

describe("GET /places/:id", () => {
  it("should return a single place for the authenticated user", async () => {
    const signupResponse = await request(app).post("/auth/signup").send({
      email: "singleplace@example.com",
      password: "password123",
      name: "Single Place User",
    });

    const token = signupResponse.body.token;

    const createResponse = await request(app)
      .post("/places")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Favorite Bookstore",
        description: "Quiet place with a coffee corner.",
        pictureUrl:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
      });

    const placeId = createResponse.body._id;

    const response = await request(app)
      .get(`/places/${placeId}`)
      .set("Authorization", `Bearer ${token}`);

    const getResponse = await request(app)
      .get(`/places/${placeId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(placeId);
    expect(response.body.name).toBe("Favorite Bookstore");
    expect(response.body.description).toBe("Quiet place with a coffee corner.");
    expect(response.body.user).toBeDefined();
  });
});

describe("GET /places/:id", () => {
  it("should return 400 for an invalid place id when authenticated", async () => {
    const signupResponse = await request(app).post("/auth/signup").send({
      email: "invalidid@example.com",
      password: "password123",
      name: "Invalid Id User",
    });

    const token = signupResponse.body.token;

    const response = await request(app)
      .get("/places/abc123")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid place id");
  });
});

describe("GET /places/:id", () => {
  it("should return 404 when the place does not exist", async () => {
    const signupResponse = await request(app).post("/auth/signup").send({
      email: "notfound@example.com",
      password: "password123",
      name: "Not Found User",
    });

    const token = signupResponse.body.token;

    const response = await request(app)
      .get("/places/507f1f77bcf86cd799439011")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Place not found");
  });
});

describe("PATCH /places/:id", () => {
  it("should update a place for the authenticated user", async () => {
    const signupResponse = await request(app).post("/auth/signup").send({
      email: "updateplace@example.com",
      password: "password123",
      name: "Update Place User",
    });

    const token = signupResponse.body.token;

    const createResponse = await request(app)
      .post("/places")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Old Place Name",
        description: "Old description",
        pictureUrl:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
      });

    const placeId = createResponse.body._id;

    const response = await request(app)
      .patch(`/places/${placeId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Updated Place Name",
        description: "Updated description",
        pictureUrl: "https://example.com/new-image.jpg",
      });

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(placeId);
    expect(response.body.name).toBe("Updated Place Name");
    expect(response.body.description).toBe("Updated description");
    expect(response.body.pictureUrl).toBe("https://example.com/new-image.jpg");
  });
});

describe("DELETE /places/:id", () => {
  it("should delete a place for the authenticated user", async () => {
    const signupResponse = await request(app).post("/auth/signup").send({
      email: "deleteplace@example.com",
      password: "password123",
      name: "Delete Place User",
    });

    const token = signupResponse.body.token;

    const createResponse = await request(app)
      .post("/places")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Place To Delete",
        description: "This place will be deleted",
        pictureUrl:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
      });

    const placeId = createResponse.body._id;

    const response = await request(app)
      .delete(`/places/${placeId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Place deleted successfully");
  });
});

describe("PATCH /places/:id", () => {
  it("should return 400 for an invalid place id when authenticated", async () => {
    const signupResponse = await request(app).post("/auth/signup").send({
      email: "patchinvalid@example.com",
      password: "password123",
      name: "Patch Invalid User",
    });

    const token = signupResponse.body.token;

    const response = await request(app)
      .patch("/places/abc123")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Updated Name",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid place id");
  });
});

describe("PATCH /places/:id", () => {
  it("should return 404 when the place does not exist", async () => {
    const signupResponse = await request(app).post("/auth/signup").send({
      email: "patchnotfound@example.com",
      password: "password123",
      name: "Patch Not Found User",
    });

    const token = signupResponse.body.token;

    const response = await request(app)
      .patch("/places/507f1f77bcf86cd799439011")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Updated Name",
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Place not found");
  });
});

describe("DELETE /places/:id", () => {
  it("should return 400 for an invalid place id when authenticated", async () => {
    const signupResponse = await request(app).post("/auth/signup").send({
      email: "deleteinvalid@example.com",
      password: "password123",
      name: "Delete Invalid User",
    });

    const token = signupResponse.body.token;

    const response = await request(app)
      .delete("/places/abc123")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid place id");
  });
});

describe("DELETE /places/:id", () => {
  it("should return 404 when the place does not exist", async () => {
    const signupResponse = await request(app).post("/auth/signup").send({
      email: "deletenotfound@example.com",
      password: "password123",
      name: "Delete Not Found User",
    });

    const token = signupResponse.body.token;

    const response = await request(app)
      .delete("/places/507f1f77bcf86cd799439011")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Place not found");
  });
});
