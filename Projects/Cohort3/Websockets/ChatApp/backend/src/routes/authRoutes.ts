import { Router } from "express";
import {
  signinController,
  signoutController,
  signupController,
} from "../controllers/authControllers";

const router = Router();

router.route("/signup").post(signupController);
router.route("/signin").post(signinController);
router.route("/signout").post(signoutController);

export default router;
