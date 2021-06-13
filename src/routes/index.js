import express from 'express';
import authRouter from './authRoute';
import profileRouter from './profileRoute';
import bankDetailsRouter from './bankDetailsRoute';
import nextOfKinRouter from './nextOfKinRoute';

const rootRouter = express.Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/profile', profileRouter);
rootRouter.use('/bankdetails', bankDetailsRouter);
rootRouter.use('/nextofkin', nextOfKinRouter);

export default rootRouter;
