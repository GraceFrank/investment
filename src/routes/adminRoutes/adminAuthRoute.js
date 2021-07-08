import express from 'express';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { loginSchema } from '../../validations/authValidation';
import { adminLogin } from '../../controllers/AdminControllers.js/adminAuthController';

const router = express.Router();

router.post('/login', validationMiddleware(loginSchema), adminLogin);

export default router;
