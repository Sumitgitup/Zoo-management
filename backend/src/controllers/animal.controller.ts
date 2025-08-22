import type { Request, Response } from "express";
import Animal from "../models/animal.model";
import type { IAnimal } from "../types/animal.type";

// @desc    Create a new animal
// @route   POST /api/animals
export const createAnimal = async (req: Request, res: Response) => {
  try {
    // Create a new animal instance directly from the validated request body
    const newAnimal: IAnimal = new Animal(req.body);

    // Save the new animal to the database
    const savedAnimal = await newAnimal.save();

    // Respond with the created animal and a 201 status
    res.status(201).json(savedAnimal);
  } catch (error) {
    // Handle potential errors
    res
      .status(500)
      .json({ message: "Server error while creating animal", error });
  }
};

// @desc    Get all animals
// @route   GET /api/animals
export const getAnimals = async (req: Request, res: Response) => {
  try {
    const animals = await Animal.find({});
    res.status(200).json(animals);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error while fetching animals", error });
  }
};

// @desc    Get a single animal by ID
// @route   GET /api/animals/:id
export const getAnimalById = async (req: Request, res: Response) => {
  try {
    const animal = await Animal.findById(req.params.id);

    if (!animal) {
      return res.status(404).json({ message: "Animal not found" });
    }

    res.status(200).json(animal);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error while fetching animal", error });
  }
};

// @desc    Update an animal by ID
// @route   PUT /api/animals/:id
export const updateAnimal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedAnimal = await Animal.findByIdAndUpdate(id, req.body, {
      new: true, // This option returns the document after it has been updated
    });

    if (!updatedAnimal) {
      return res.status(404).json({ message: "Animal not found" });
    }

    res.status(200).json(updatedAnimal);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error while updating animal", error });
  }
};

// @desc    Delete an animal by ID
// @route   DELETE /api/animals/:id
export const deleteAnimal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedAnimal = await Animal.findByIdAndDelete(id);

    if (!deletedAnimal) {
      return res.status(404).json({ message: "Animal not found" });
    }

    res.status(200).json({ message: "Animal deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error while deleting animal", error });
  }
};
