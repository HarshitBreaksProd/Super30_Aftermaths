import { PrismaClient } from "./generated/prisma/edge";
// import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/api/v1/signup", async (c) => {
  const body = await c.req.json();
  const prismaClient = new PrismaClient({
    // @ts-ignore
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prismaClient.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });

    return c.json({
      id: user.id,
    });
  } catch (e) {
    console.log(e);
    return c.text("Error creating user");
  }
});

app.post("/api/v1/signin", async (c) => {
  const body = await c.req.json();
  const prismaClient = new PrismaClient({
    // @ts-ignore
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prismaClient.user.findFirstOrThrow({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    return c.json({
      id: user.id,
    });
  } catch (e) {
    return c.text("Error finding user");
  }
});

app.use(async (c, next) => {
  const authHeaders = c.req.header("Authorization");

  if (authHeaders) {
    console.log("Auth header found");
    await next();
  } else {
    console.log("Auth header not found");
    return c.text("Not Authenticated");
  }
});

app.post("api/v1/todo", async (c) => {
  const body = await c.req.json();
  const prismaClient = new PrismaClient({
    // @ts-ignore
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const todo = await prismaClient.todo.create({
      data: {
        title: body.title,
      },
    });

    return c.json({
      id: todo.id,
    });
  } catch (e) {
    return c.text("Could not create todo");
  }
});

app.get("api/v1/todo", async (c) => {
  const prismaClient = new PrismaClient({
    // @ts-ignore
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const todo = await prismaClient.todo.findMany();

    return c.json({
      todo: todo,
    });
  } catch (e) {
    return c.text("Could not fetch todos");
  }
});

export default app;
