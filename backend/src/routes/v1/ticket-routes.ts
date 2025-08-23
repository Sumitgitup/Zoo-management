import { Router } from "express";
import {
  createTicket,
  getAllTicket,
  getTicketById,
  updateTicket,
} from "../../controllers/ticket-controller";

const router = Router();

router.post("/", createTicket);
router.get("/", getAllTicket);
router.get("/:id", getTicketById);
router.get("/:id", updateTicket);

export default router;
