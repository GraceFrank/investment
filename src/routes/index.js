import express from 'express';
import authRouter from './authRoute';
import profileRouter from './profileRoute';
import bankDetailsRouter from './bankDetailsRoute';

const rootRouter = express.Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/profile', profileRouter);
rootRouter.use('/bankdetails', bankDetailsRouter);

export default rootRouter;
