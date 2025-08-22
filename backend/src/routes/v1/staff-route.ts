
import { Router } from 'express';
import {
  createStaff,
  getStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
} from '../../controllers/staff-controller';
import validateResource from '../../middlewares/validate-input'; // Assuming you created this
import { createStaffSchema, updateStaffSchema } from '../../types/staff';

const router = Router();

router.route('/')
  .get(getStaff)
  .post(validateResource(createStaffSchema), createStaff);

router.route('/:id')
  .get(getStaffById)
  .put(validateResource(updateStaffSchema), updateStaff)
  .delete(deleteStaff);

export default router;
