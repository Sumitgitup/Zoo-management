

import {Router} from 'express';


import {
  createAnimal,
  getAnimals,
  getAnimalById,
  updateAnimal,
  deleteAnimal,
} from '../../controllers/animal.controller';

const router = Router();

// Route to get all animals and create a new animal
router.route('/')
  .get(getAnimals)
  .post(createAnimal);

// Route to get, update, and delete a single animal by its ID
router.route('/:id')
  .get(getAnimalById)
  .put(updateAnimal)
  .delete(deleteAnimal);





export default router;