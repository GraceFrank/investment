import express from 'express';

import { getReferrals } from '../controllers/ReferralsController';
import authenticateToken from '../middlewares/authenticate';

const router = express.Router();

router.get('/', authenticateToken, getReferrals);

export default router;
