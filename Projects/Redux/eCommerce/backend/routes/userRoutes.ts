import express from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getCurrentUserProfile,
  loginUser,
  logoutUser,
  updateCurrentUserProfile,
  getUserById,
  updateUserById,
} from "../controllers/userControler";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddlewares";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers);
router.post("/auth", loginUser);
router.post("/logout", logoutUser);

router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

// ADMIN ROUTES
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById);

export default router;
