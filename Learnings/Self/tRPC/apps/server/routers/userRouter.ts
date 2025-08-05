import { z } from "zod";
import { t } from "../trpc";

export const userRouter = t.router({
  getUser: t.procedure.input(z.object({ id: z.string() })).query((opts) => {
    const userId = opts.input.id;
    console.log(userId);
    return { id: userId, name: "Didi" };
  }),
  createUser: t.procedure
    .input(z.object({ name: z.string(), email: z.string() }))
    .mutation(async (opts) => {
      console.log(opts.input);
      return { id: "dummyId", name: opts.input.name, email: opts.input.email };
    }),
});
