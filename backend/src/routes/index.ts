import { Router } from "express";

import animalRoutes from "./v1/animal-route";
import visitorRoutes from "./v1/visitor-routes";

const router = Router();

router.use("/v1/animals", animalRoutes);
router.use("/v1/visitors", visitorRoutes);

export default router;
