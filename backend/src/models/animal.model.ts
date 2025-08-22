
import { Schema, model } from 'mongoose';
import type { IAnimal } from '../types/animal';

const animalSchema = new Schema<IAnimal>({
  name: { type: String, required: true },
  species: { type: String, required: true },
  date_of_birth: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  health_status: {
    type: String,
    enum: ['Healthy', 'Under Observation', 'Requires Attention'],
    default: 'Healthy'
  },
  imageUrl: { type: String, required: false },
  description: { type: String, required: false },
  arrival_date: { type: String, required:true },

  // --- ADDED ENCLOSURE OBJECT ---
  enclosure: {
    name: { type: String },
    type: { type: String, enum: ['Safari', 'Bird Sanctuary', 'Reptile House']},
    location: { type: String },
  },
}, {
  timestamps: true
});

const Animal = model<IAnimal>('Animal', animalSchema);
export default Animal;

// name, species, status, arrivalDate, enclosure