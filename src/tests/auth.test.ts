import request from "supertest";
import mongoose from "mongoose";
import app from "../app";
import connectDB from "../config/db";

describe("Auth API", () => {
  const testEmail = `test_${Date.now()}@example.com`;
  const password = "Password123!";

  jest.setTimeout(20000);

  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should register a new user", async () => {
    const res = await request(app).post("/api/users/register").send({
      name: "Test User",
      email: testEmail,
      password,
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("User registered successfully");
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("email");
    expect(res.body.data.email).toBe(testEmail);
  });

  it("should login with the registered user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testEmail,
      password,
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Login successful");
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("token");
    expect(res.body.data).toHaveProperty("user");
    expect(res.body.data.user.email).toBe(testEmail);
  });
});
