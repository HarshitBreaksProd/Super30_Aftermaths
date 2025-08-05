import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./routers";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use("/api/v1", trpcExpress.createExpressMiddleware({ router: appRouter }));

app.listen(3000, () => {
  console.log("Listening on 3000");
});

export type AppRouter = typeof appRouter;
