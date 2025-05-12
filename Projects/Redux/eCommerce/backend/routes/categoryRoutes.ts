import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddlewares";
import {
  createCategory,
  deleteCategory,
  getCategoryDetails,
  listCategories,
  updateCategory,
} from "../controllers/categoryController";

const router = express.Router();

router.route("/").post(authenticate, authorizeAdmin, createCategory);

router.route("/categories").get(listCategories);

router
  .route("/:id")
  .put(authenticate, authorizeAdmin, updateCategory)
  .delete(authenticate, authorizeAdmin, deleteCategory)
  .get(authenticate, authorizeAdmin, getCategoryDetails);

export default router;
