import { t } from "../trpc";
import { userRouter } from "./userRouter";

export const appRouter = t.router({
  user: userRouter,
});
