import { Router } from "express";
import { addMessage, fetchMessages } from "../controllers/messageControllers";
const router = Router();

router.route("/").post(addMessage);
router.route("/:roomId").get(fetchMessages);

export default router;
