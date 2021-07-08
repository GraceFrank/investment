import express from 'express';
import authenticateToken from '../middlewares/authenticate';
import validationMiddleware from '../middlewares/validationMiddleware';
import { investmentSchema } from '../validations/investmentValidation';
import {
  createInvestment,
  getUserInvestments,
} from '../controllers/investmentController';
import { uploadFile } from '../middlewares/fileUploadMiddleware';

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  uploadFile.single('paymentProof'),
  validationMiddleware(investmentSchema),
  createInvestment
);

router.get('/', authenticateToken, getUserInvestments);

export default router;
