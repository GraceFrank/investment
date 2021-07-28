/* eslint-disable no-underscore-dangle */
import UserModel from '../models/UserModel';
import ReferralModel from '../models/ReferralModel';
import AppError from '../utils/appError';

export const getReferrals = async (req, res, next) => {
  try {
    const referrals = await ReferralModel.find({
      referrer: req.user.account_id,
    });

    const totalEarned = referrals.reduce(
      (total, referral) => total + referral.bonus,
      0
    );

    return res.status(200).send({
      statusCode: 200,
      status: 'success',
      payload: { totalEarned, referrals },
    });
  } catch (err) {
    console.log(err);
    return next(err, req, res, next);
  }
};

export const createReferral = async (referrerId, refereeId) => {
  try {
    const referrer = await UserModel.findOne({ account_id: referrerId });
    if (referrer) {
      await ReferralModel.create({
        referrer: referrerId,
        referee: refereeId,
      });
    }
  } catch (err) {
    console.log('ERROR', err);
  }
};

export const AddReferralBonus = async (refereeId) => {
  const referral = await ReferralModel.findOne({ referee: refereeId });
  if (!referral) return;
  if (!referral.invested) {
    await ReferralModel.updateOne(
      { _id: referral._id },
      { bonus: 500, invested: true }
    );
  }
};

export const markAsPaid = async (req, res, next) => {
  try {
    const { id } = req.params;
    const referral = await ReferralModel.findOneAndUpdate(
      { _id: id, invested: true },
      { paid: true }
    );
    if (!referral) {
      const error = new AppError(400, 'fail', 'invalid id');
      return next(error, req, res, next);
    }
    return res.status(200).send({
      statusCode: 200,
      status: 'success',
      payload: referral,
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};

export const getAllReferrals = async (req, res, next) => {
  try {
    const { invested, paid, page } = req.query;
    const search = {};
    if (invested) {
      search.invested = JSON.parse(invested);
    }
    if (paid) {
      search.paid = JSON.parse(paid);
    }
    const pageNumber = page ? Number(page) - 1 : 0;
    const investments = await ReferralModel.find(search)
      .limit(30)
      .skip(30 * pageNumber)
      .sort({ createdAt: 'desc' });
    return res.status(200).send({
      statusCode: 200,
      status: 'success',
      payload: investments,
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};
