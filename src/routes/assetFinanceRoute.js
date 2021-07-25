import express from 'express';
import authenticateToken from '../middlewares/authenticate';
import validationMiddleware from '../middlewares/validationMiddleware';
import {
  assetFinanceSchema,
  approvalSchema,
  markAsPaidSchema,
} from '../validations/assetFinanceValidation';
import {
  createAssetFinance,
  getUserAssets,
  getAllAssets,
  updateAssets,
  approveAssetFinance,
} from '../controllers/AssetFinanceController';
import { uploadFile } from '../middlewares/fileUploadMiddleware';
import authorize from '../middlewares/authorize';
import validateId from '../middlewares/validateIdMiddleware';

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  uploadFile.fields([
    { name: 'proformaInvoice', maxCount: 1, minCount: 1 },
    { name: 'paymentProof', maxCount: 1, minCount: 1 },
  ]),
  validationMiddleware(assetFinanceSchema),
  createAssetFinance
);

router.get('/', authenticateToken, getUserAssets);
router.get('/all', authenticateToken, authorize, getAllAssets);
router.put(
  '/:id/approval',
  validationMiddleware(approvalSchema),
  authenticateToken,
  authorize,
  validateId,
  approveAssetFinance
);
router.put(
  '/:id/payment',
  validationMiddleware(markAsPaidSchema),
  authenticateToken,
  authorize,
  validateId,
  updateAssets
);

export default router;
