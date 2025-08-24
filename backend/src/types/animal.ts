import { Document } from "mongoose";

import { z } from "zod";

const emptyStringToUndefined = z.preprocess((val) => {
  if (typeof val === "string" && val === "") return undefined;
  return val;
}, z.any());

export const getAnimalsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().optional(),
    species: z.coerce.string().optional(),
    gender: z.enum(["Male", "Female"]).optional(),
  }),
});

// 1. Define a new schema for the enclosure details
const enclosureSchema = z.object({
  name: z.string().min(1, { message: "Enclosure name is required" }),
  type: z.enum(["Safari", "Bird Sanctuary", "Reptile House"]),
  location: z.string().optional(), // e.g., "Sector A, Row 3"
});

// 1. Define the base schema for all animal properties. This is the single source of truth.
const animalBaseSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  species: z.string().min(1, { message: "Species is required" }),
  date_of_birth: z.string(),
  gender: emptyStringToUndefined.pipe(z.enum(["Male", "Female"])),
  health_status: emptyStringToUndefined.pipe(
    z.enum(["Healthy", "Under Observation", "Requires Attention"]).optional()
  ),
  description: z.string().optional(),
  imageUrl: z.url().optional(),
  arrival_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),

  // 2. Add the enclosure schema to the animal schema (making it optional)
  enclosure: enclosureSchema.optional(),
});

// 2. Infer the TypeScript type from the base Zod schema.
type IAnimalBase = z.infer<typeof animalBaseSchema>;

// 3. Create the final interface for your Mongoose model by extending the base type.
export interface IAnimal extends IAnimalBase, Document {}

// 4. Create the schema for validating new animal creation.
export const createAnimalSchema = z.object({
  // The request body must match the shape of the base schema.
  body: animalBaseSchema,
});

// 5. Create the schema for validating animal updates.
export const updateAnimalSchema = z.object({
  // .partial() makes all fields in the base schema optional for updates.
  body: animalBaseSchema.partial(),
  params: z.object({
    id: z.string().min(1, { message: "Id is required" }),
  }),
});
