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
      payload: fakeData,
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};
