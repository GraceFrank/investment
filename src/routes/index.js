import express from 'express';
import authRouter from './authRoute';
import profileRouter from './profileRoute';
import bankDetailsRouter from './bankDetailsRoute';
import nextOfKinRouter from './nextOfKinRoute';
import AssetFinanceRouter from './assetFinanceRoute';

const rootRouter = express.Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/profile', profileRouter);
rootRouter.use('/bankdetails', bankDetailsRouter);
rootRouter.use('/nextofkin', nextOfKinRouter);
rootRouter.use('/assets', AssetFinanceRouter);

export default rootRouter;
