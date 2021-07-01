/* eslint-disable no-underscore-dangle */
import UserModel from '../models/UserModel';
import ReferralModel from '../models/ReferralModel';

const fakeData = [
  {
    account_id: 'YPoid',
    bonus_earned: 1000,
    invested: true,
    registration_date: '2021-06-13T06:37:51.250+00:00',
  },

  {
    account_id: 'yTu!odA',
    bonus_earned: 0,
    invested: false,
    registration_date: '2021-06-13T06:37:51.250+00:00',
  },
  {
    account_id: '1BuoRd',
    bonus_earned: 0,
    invested: false,
    registration_date: '2021-06-13T06:37:51.250+00:00',
  },
];

export const getReferrals = async (req, res, next) => {
  try {
    return res.status(200).send({
      statusCode: 200,
      status: 'success',
      payload: { totalEarned: 1000, referrals: fakeData },
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
