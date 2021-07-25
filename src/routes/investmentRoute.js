import express from 'express';
import authenticateToken from '../middlewares/authenticate';
import validationMiddleware from '../middlewares/validationMiddleware';
import { investmentSchema } from '../validations/investmentValidation';
import {
  createInvestment,
  getUserInvestments,
  getAllInvestments,
  activateInvestment,
} from '../controllers/investmentController';
import { uploadFile } from '../middlewares/fileUploadMiddleware';
import authorize from '../middlewares/authorize';
import validateId from '../middlewares/validateIdMiddleware';
import {
  approvalSchema,
  markAsPaidSchema,
} from '../validations/assetFinanceValidation';

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  uploadFile.single('paymentProof'),
  validationMiddleware(investmentSchema),
  createInvestment
);

router.get('/', authenticateToken, getUserInvestments);
router.get('/all', authenticateToken, authorize, getAllInvestments);
router.put(
  '/:id/approval',
  validationMiddleware(approvalSchema),
  authenticateToken,
  authorize,
  validateId,
  activateInvestment
);
router.put(
  '/:id/payment',
  validationMiddleware(markAsPaidSchema),
  authenticateToken,
  authorize,
  validateId
);

export default router;
