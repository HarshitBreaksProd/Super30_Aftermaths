import { Router } from "express";
import { createTag, fetchAllTags, fetchTagsByKeyword } from "../controllers/tagsController";

const router = Router();

router.route("/").post(createTag).get(fetchAllTags);

router.route("/:keyword").get(fetchTagsByKeyword);

export default router;
