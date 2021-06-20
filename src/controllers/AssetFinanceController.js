import AssetFinanceModel from '../models/AssetFinanceModel';

export const createAssetFinance = async (req, res, next) => {
  const { _id: userId } = req.user;
  try {
    const newAssetFinance = await AssetFinanceModel.create({
      ...req.body,
      user: userId,
    });
    return res.status(201).send({
      statusCode: 201,
      status: 'created',
      payload: newAssetFinance,
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};

export const getUserAssets = async (req, res, next) => {
  const { _id: userId } = req.user;
  try {
    const assetFinances = await AssetFinanceModel.find({ user: userId });

    return res.status(200).send({
      statusCode: 200,
      status: 'success',
      payload: assetFinances,
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};
