import { Router } from "express";
import {
  getStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
} from "../../controllers/staff-controller";
import validateResource from "../../middlewares/validate-input"; // Assuming you created this
import { getStaffSchema, updateStaffSchema } from "../../types/staff";

const router = Router();

router.route("/")
.get(validateResource(getStaffSchema), getStaff)


router
  .route("/:id")
  .get(getStaffById)
  .put(validateResource(updateStaffSchema), updateStaff)
  .delete(deleteStaff);

export default router;
