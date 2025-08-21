import { z } from 'zod';
import { Document } from 'mongoose';

// 1. Define the base schema for all animal properties. This is the single source of truth.
const animalBaseSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  species: z.string().min(1, { message: 'Species is required' }),
  date_of_birth: z.date().optional(),
  gender: z.enum(['Male', 'Female']),
  health_status: z.enum(['Healthy', 'Under Observation', 'Requires Attention']),
  arrival_date: z.date().optional(),
  description: z.string().optional(),
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
    id: z.string().min(1, { message: 'Id is required' }),
  }),
});

