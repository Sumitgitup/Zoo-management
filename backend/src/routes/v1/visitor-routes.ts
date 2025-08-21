import { Router } from "express";
import { visitorController } from "../../controllers";
import validateInput from "../../middlewares/validate-input";
import {
  createVisitorSchema,
  updateVisitorSchema,
} from "../../types/validation";

const router = Router();

router.post(
  "/",
  validateInput(createVisitorSchema),
  visitorController.createVisitor
);

router.get("/", visitorController.getAllVisitor);

router.get("/:id", visitorController.getVisitorById);

router.patch(
  "/:id",
  validateInput(updateVisitorSchema),
  visitorController.updateVisitor
);

router.get("/search", visitorController.searchVisitor);

export default router;
