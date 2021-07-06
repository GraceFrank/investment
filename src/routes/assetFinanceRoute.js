import express from "express";
import authenticateToken from "../middlewares/authenticate";
import validationMiddleware from "../middlewares/validationMiddleware";
import { assetFinanceSchema } from "../validations/assetFinanceValidation";
import {
  createAssetFinance,
  getUserAssets,
} from "../controllers/AssetFinanceController";
import { uploadFile } from "../middlewares/fileUploadMiddleware";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  uploadFile.fields([
    { name: "proformaInvoice", maxCount: 1, minCount: 1 },
    { name: "paymentProof", maxCount: 1, minCount: 1 },
  ]),
  validationMiddleware(assetFinanceSchema),
  createAssetFinance
);

router.get("/", authenticateToken, getUserAssets);

export default router;
