import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export type LoginType = z.infer<typeof loginSchema>;

export default loginSchema;
