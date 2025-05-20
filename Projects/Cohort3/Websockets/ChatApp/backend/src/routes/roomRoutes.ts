import { Router } from "express";
import {
  createRoom,
  fetchParticipatedRooms,
  fetchRoomInfoById,
  joinRoom,
  userVerification,
} from "../controllers/roomController";

const router = Router();

router.route("/").get(fetchParticipatedRooms);
router.route("/info/:roomId").get(fetchRoomInfoById);
router.route("/create").post(createRoom);
router.route("/verify/:roomId").get(userVerification);
router.route("/:joinCode").post(joinRoom);

export default router;
