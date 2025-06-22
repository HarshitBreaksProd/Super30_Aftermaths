import { Router } from "express";
import {
  createContent,
  deleteContentById,
  fetchAllContent,
} from "../controllers/contentControllers";
const router = Router();

router.route("/").post(createContent).get(fetchAllContent);

router.route("/:id").delete(deleteContentById);

export default router;
