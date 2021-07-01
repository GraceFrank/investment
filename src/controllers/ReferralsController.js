/* eslint-disable no-underscore-dangle */
import UserModel from '../models/UserModel';
import ReferralModel from '../models/ReferralModel';

export const getReferrals = async (req, res, next) => {
  try {
    const referrals = ReferralModel.find({ referrerId: req.user.account_id });
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
    return next(err, req, res, next);
  }
};

export const createReferral = async (referrerId, refereeId) => {
  const referrer = await UserModel.findOne({ account_id: referrerId });
  if (referrer) {
    await ReferralModel.create({
      referrer: referrerId,
      referee: refereeId,
    });
  }
};

export const AddReferralBonus = async (refereeId) => {
  const referral = await ReferralModel.findOne({ referee: refereeId });
  if (!referral) return;
  if (!referral.invested) {
    await ReferralModel.updateOne(
      { _id: referral._id },
      { bonus: 1000, invested: true }
    );
  }
};
