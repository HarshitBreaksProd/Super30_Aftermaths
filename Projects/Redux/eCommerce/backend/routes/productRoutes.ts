import express from "express";
import formidable from "express-formidable";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddlewares";
import checkId from "../middlewares/checkId";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  fetchProductById,
  fetchProducts,
  fetchAllProduct,
  fetchTopProducts,
  fetchNewProducts,
  addProductReview,
} from "../controllers/productsController";

const router = express.Router();

router
  .route("/")
  .post(authenticate, authorizeAdmin, formidable(), createProduct)
  .get(fetchProducts);

router.route("/allproducts").get(fetchAllProduct);
router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);

router.route("/:id/reviews").post(authenticate, checkId, addProductReview);
router
  .route("/:id")
  .put(authenticate, authorizeAdmin, formidable(), updateProduct)
  .delete(authenticate, authorizeAdmin, deleteProduct)
  .get(fetchProductById);

export default router;
