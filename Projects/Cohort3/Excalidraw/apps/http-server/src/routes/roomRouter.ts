import { Router } from "express";
import { createRoomController } from "../controllers/roomControllers";
import { authenticateUser } from "../middlewares/authenticateUser";

const router = Router();

router.route("/create").post(authenticateUser, createRoomController);

export default router;
