import z from "zod";

export const createVisitorSchema = z.object({
  name: z.string().min(3).trim(),
  email: z.email(),
  age: z.number().int().nonnegative(),
  nationality: z
    .enum(["National", "International"])
    .default("National")
    .optional(),
  phone: z.string().optional(),
});

export const updateVisitorSchema = createVisitorSchema.partial();

export type UpdateVisitorType = z.infer<typeof updateVisitorSchema>;

export type CreateVisitorType = z.infer<typeof createVisitorSchema>;

export interface GetVisitorQuery {
  name?: string;
  nationality?: string;
  ageGroup?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}
