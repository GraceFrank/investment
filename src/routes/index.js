import express from 'express';
import authRouter from './authRoute';

const rootRouter = express.Router();

rootRouter.use('/auth', authRouter);

export default rootRouter;
