import express from 'express';
import authenticateToken from '../middlewares/authenticate';
import validationMiddleware from '../middlewares/validationMiddleware';
import { assetFinanceSchema } from '../validations/assetFinanceValidation';
import {
  createAssetFinance,
  getUserAssets,
} from '../controllers/AssetFinanceController';

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  validationMiddleware(assetFinanceSchema),
  createAssetFinance
);

router.get('/', authenticateToken, getUserAssets);

export default router;
