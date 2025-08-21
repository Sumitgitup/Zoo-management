import { Router } from "express";
import { visitorController } from "../../controllers";

const router = Router();

router.post("/", visitorController.createVisitor);
router.get("/", visitorController.getAllVisitor);
router.get("/:id", visitorController.getVisitorById);
router.put("/:id", visitorController.updateVisitor);
router.get("/search", visitorController.searchVisitor);

export default router;
