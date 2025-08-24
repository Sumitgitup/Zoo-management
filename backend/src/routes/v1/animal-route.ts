import { Router } from "express";

import {
  createAnimal,
  deleteAnimal,
  getAnimalById,
  getAnimals,
  updateAnimal,
} from "../../controllers/animal-controller";

import validateInput from "../../middlewares/validate-input";
import {
  createAnimalSchema,
  getAnimalsSchema,
  updateAnimalSchema,
} from "../../types/animal";
import { uploadFile } from "../../middlewares/upload";
import { authenticateToken } from "../../middlewares/authenticateToken";
import { authorize } from "../../middlewares/authorize";

const router = Router();

// Route to get all animals and create a new animal
router
  .route("/")
  .get(validateInput(getAnimalsSchema), getAnimals)
  .post(uploadFile("file"), validateInput(createAnimalSchema), createAnimal);

// Route to get, update, and delete a single animal by its ID
router
  .route("/:id")
  .get(getAnimalById)
  .put(uploadFile("file"), validateInput(updateAnimalSchema), updateAnimal)
  .delete(deleteAnimal);

export default router;
