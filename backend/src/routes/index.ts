import { Router } from "express";

import animalRoutes from "./v1/animal-route";
import visitorRoutes from "./v1/visitor-routes";
import staffRoutes from "./v1/staff-route";
const router = Router();

router.use("/v1/animals", animalRoutes);
router.use("/v1/visitors", visitorRoutes);
router.use("/v1/staff", staffRoutes);

export default router;
