import { Router } from "express";
import {
  enableBrainShareController,
  getSharedBrainControler,
  getShareLinkStatus,
} from "../controllers/brainController";

const router = Router();

router.route("/share").post(enableBrainShareController).get(getShareLinkStatus);

router.route("/:shareLink").get(getSharedBrainControler);

export default router;
