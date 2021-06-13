import express from 'express';
import authRouter from './authRoute';
import profileRouter from './profileRoute';

const rootRouter = express.Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/profile', profileRouter);

export default rootRouter;
