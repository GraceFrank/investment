import express from 'express';
import authRouter from './adminAuthRoute';

const rootRouter = express.Router();

rootRouter.use('/auth', authRouter);

export default rootRouter;
