import { Elysia, t } from "elysia";
import { registerUser } from "../services/user-service";

export const userRoute = new Elysia({ prefix: "/api/users" })
  .onError(({ code, error }) => {
    if (code === 'VALIDATION') {
      return { data: "error" };
    }
  })
  .post("/", async ({ body, set }) => {
    const result = await registerUser(body);
    
    if (result.success) {
      return { data: "ok" };
    } else {
      set.status = 400;
      return { data: "error" };
    }
  }, {
    body: t.Object({
      name: t.String(),
      email: t.String(),
      password: t.String()
    })
  });
