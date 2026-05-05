import { Elysia } from "elysia";
import { db } from "./db";
import { users } from "./db/schema";
import { userRoute } from "./routes/user-route";

export const app = new Elysia()
  .use(userRoute)
  .get("/", () => "Hello Elysia with Drizzle!")
  .get("/users", async () => {
    return await db.select().from(users);
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
