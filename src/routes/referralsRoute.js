import express from 'express';

import {
  getReferrals,
  getAllReferrals,
  markAsPaid,
} from '../controllers/ReferralsController';
import authenticateToken from '../middlewares/authenticate';
import authorize from '../middlewares/authorize';
import validationMiddleware from '../middlewares/validationMiddleware';
import { searchSchema } from '../validations/refferalValidation';
import validateId from '../middlewares/validateIdMiddleware';

const router = express.Router();

router.get('/', authenticateToken, getReferrals);
router.get(
  '/all',
  authenticateToken,
  authorize,
  validationMiddleware(searchSchema, 'query'),
  getAllReferrals
);

router.put(
  '/:id/approval',
  authenticateToken,
  authorize,
  validateId,
  markAsPaid
);

export default router;
