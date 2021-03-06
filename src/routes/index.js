import express from 'express';
import authRouter from './authRoute';
import profileRouter from './profileRoute';
import bankDetailsRouter from './bankDetailsRoute';
import nextOfKinRouter from './nextOfKinRoute';
import assetFinanceRouter from './assetFinanceRoute';
import investmentRouter from './investmentRoute';
import referralsRoute from './referralsRoute';
import usersRoute from './usersRoute';

const rootRouter = express.Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/profile', profileRouter);
rootRouter.use('/bankdetails', bankDetailsRouter);
rootRouter.use('/nextofkin', nextOfKinRouter);
rootRouter.use('/assets', assetFinanceRouter);
rootRouter.use('/investments', investmentRouter);
rootRouter.use('/referrals', referralsRoute);
rootRouter.use('/users', usersRoute);

export default rootRouter;
