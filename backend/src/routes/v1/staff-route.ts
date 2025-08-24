import { Router } from "express";
import {
  getStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
  createStaff,
} from "../../controllers/staff-controller";
import validateResource from "../../middlewares/validate-input"; // Assuming you created this
import { getStaffSchema, updateStaffSchema } from "../../types/staff";
import { createAnimal } from "../../controllers/animal-controller";

const router = Router();

router.route("/")
.get(validateResource(getStaffSchema), getStaff)
.post(createStaff)

router
  .route("/:id")
  .get(getStaffById)
  .put(validateResource(updateStaffSchema), updateStaff)
  .delete(deleteStaff);

export default router;
