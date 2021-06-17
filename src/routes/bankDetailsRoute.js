import express from 'express';
import validationMiddleware from '../middlewares/validationMiddleware';
import { bankDetailsSchema } from '../validations/bankDetailsValidations';
import {
  getBankDetails,
  createBankDetails,
  updateBankDetails,
} from '../controllers/bankDetailsController';
import authenticateToken from '../middlewares/authenticate';

const router = express.Router();

router.get('/', authenticateToken, getBankDetails);
router.post(
  '/',
  authenticateToken,
  validationMiddleware(bankDetailsSchema),
  createBankDetails
);
router.put(
  '/',
  authenticateToken,
  validationMiddleware(bankDetailsSchema),
  updateBankDetails
);

export default router;
