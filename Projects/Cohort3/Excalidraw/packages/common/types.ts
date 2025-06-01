import { z } from "zod";

export const UserSignupSchema = z.object({
  username: z.string(),
  password: z.string(),
  name: z.string(),
});

export const UserSigninSchema = z.object({
  username: z.string(),
  password: z.string(),
});
