import z from "zod";

const createVisitorSchema = z.object({
  visitorId: z.string(),
  name: z.string().min(3).trim(),
  email: z.email().lowercase(),
  age: z.number().int().nonnegative(),
  ageGroup: z.enum(["Adult", "Child"]).default("Adult").optional(),
  nationality: z
    .enum(["National", "International"])
    .default("National")
    .optional(),
  phone: z.string().optional(),
});

export type CreateVisitorSchema = z.infer<typeof createVisitorSchema>;
