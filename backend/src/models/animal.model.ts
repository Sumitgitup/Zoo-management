
import { Schema, model } from 'mongoose';

import type { IAnimal } from '../types/animal';

// 2. Create the Schema corresponding to the interface
const animalSchema = new Schema<IAnimal>({
  name: { type: String, required: true },
  species: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  health_status: { 
    type: String, 
    enum: ['Healthy', 'Under Observation', 'Requires Attention'], 
    default: 'Healthy' 
  },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// 3. Create and export the Model
const Animal = model<IAnimal>('Animal', animalSchema);

export default Animal;

