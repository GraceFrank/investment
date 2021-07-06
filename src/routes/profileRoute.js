import express from "express";
import validationMiddleware from "../middlewares/validationMiddleware";
import { profileSchema } from "../validations/ProfileValidation";
import {
  getProfile,
  createProfile,
  updateProfile,
} from "../controllers/profileController";
import authenticateToken from "../middlewares/authenticate";

const router = express.Router();

router.get("/", authenticateToken, getProfile);
router.post(
  "/",
  authenticateToken,
  validationMiddleware(profileSchema),
  createProfile
);
router.put(
  "/",
  authenticateToken,
  validationMiddleware(profileSchema),
  updateProfile
);

export default router;
