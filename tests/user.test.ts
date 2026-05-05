import { describe, expect, it, mock } from "bun:test";
import { app } from "../src/index";

describe("User Registration", () => {
  it("should return success for valid payload", async () => {
    const response = await app.handle(
      new Request("http://localhost/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "testuser",
          email: `test${Date.now()}@example.com`,
          password: "password123",
        }),
      })
    );

    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.data).toBe("ok");
  });

  it("should return error for invalid payload", async () => {
    const response = await app.handle(
      new Request("http://localhost/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Missing email and password
          name: "testuser",
        }),
      })
    );

    const body = await response.json();
    // Since we didn't add validation, it might still try to save and fail at DB level
    expect(body.data).toBe("error");
  });
});
