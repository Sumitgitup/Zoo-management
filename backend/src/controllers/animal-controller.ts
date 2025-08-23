import type { Request, Response } from "express";
import Animal from "../models/animal.model";
import { type UploadApiResponse } from "cloudinary";
import cloudinary from "../config/cloudinary-config";

const uploadToCloudinary = (fileBuffer: Buffer): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder: "animals" },
      (error, result) => {
        // This callback is the key. We ensure it always rejects with a real Error.
        if (error) {
          return reject(new Error(error.message || "Cloudinary upload failed"));
        }
        if (!result) {
          return reject(new Error("Cloudinary upload returned no result."));
        }
        resolve(result as UploadApiResponse);
      }
    );
    // Handle stream errors as a backup
    uploadStream.on("error", (err) => {
      reject(new Error(`Upload stream error: ${err.message}`));
    });
    uploadStream.end(fileBuffer);
  });
};


// Create a new animal
// @route   POST /api/animals
export const createAnimal = async (req: Request, res: Response) => {
  try {
    const { body } = res.locals.validatedData;
    console.log("inside the createRoute");
    let imageUrl: string | undefined = undefined;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }
    // Create a new animal instance directly from the validated request body
    const newAnimal = new Animal({ ...body, imageUrl });

    // Save the new animal to the database
    const savedAnimal = await newAnimal.save();

    // Respond with the created animal and a 201 status
    res.status(201).json(savedAnimal);
  } catch (error) {
    // --- SOLUTION PART 2: Better Error Logging and Response ---
    console.error("Detailed error creating animal:", error);

    // This ensures you always get a useful JSON error message
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({
      message: "Server error while creating animal.",
      error: errorMessage,
    });
  }
};

// Get all animals
// @route   GET /api/animals
export const getAnimals = async (req: Request, res: Response) => {
  try {
    const { query } = res.locals.validatedData;
    const { page = 1, limit = 10, species, gender } = query; 
    const filter: any = {};

    if (species) {
      filter.species = { $regex: species, $options: 'i' };
    }
    if (gender) {
      filter.gender = gender;
    }
    const skip = (page - 1) * limit;

    // Fetch the data and the total count in parallel for efficiency
    const [animals, total] = await Promise.all([
      Animal.find(filter).skip(skip).limit(limit),
      Animal.countDocuments(filter),
    ])

    //Send the generated response
    res.status(200).json({
      data: animals,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total/limit),
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching animals', error });
  }
}


// Get single animal by id
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

// Update an animal by ID
// @route   PUT /api/animals/:id
export const updateAnimal = async (req: Request, res: Response) => {
  try {
    const { params, body } = res.locals.validatedData;
    const { id } = params;
    let imageUrl: string | undefined = undefined;

    if (req.file) {
      const result: UploadApiResponse = await uploadToCloudinary(
        req.file.buffer
      );
      imageUrl = result.secure_url;
    }

    const updateData = { ...body };
    if (imageUrl) {
      updateData.imageUrl = imageUrl;
    }

    const updatedAnimal = await Animal.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedAnimal) {
      return res.status(404).json({ message: "Animal not found" });
    }
    res.status(200).json(updatedAnimal);
  } catch (error) {
    console.error("Detailed error updating animal:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({
      message: "Server error while updating animal.",
      error: errorMessage,
    });
  }
};

// Delete an animal by ID
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
