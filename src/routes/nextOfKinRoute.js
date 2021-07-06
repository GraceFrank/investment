import express from "express";
import validationMiddleware from "../middlewares/validationMiddleware";
import { nextOfKinSchema } from "../validations/nextOfKinValidation";
import {
  getNextOfKin,
  createNextOfKin,
  updateNextOfKin,
} from "../controllers/nextOfKinController";
import authenticateToken from "../middlewares/authenticate";

const router = express.Router();

router.get("/", authenticateToken, getNextOfKin);
router.post(
  "/",
  authenticateToken,
  validationMiddleware(nextOfKinSchema),
  createNextOfKin
);
router.put(
  "/",
  authenticateToken,
  validationMiddleware(nextOfKinSchema),
  updateNextOfKin
);

export default router;
