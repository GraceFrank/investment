import _ from 'lodash';
import NextOfKinModel from '../models/NextOfKinModel';
import AppError from '../utils/appError';

function nextOfKinDTO(nextOfKinDetails) {
  return _.pick(nextOfKinDetails, [
    'full_name',
    'email',
    'phone',
    'relationship',
  ]);
}

export const createNextOfKin = async (req, res, next) => {
  const { _id: userId } = req.user;
  const nextOfKin = req.body;
  try {
    const existingNextOfKin = await NextOfKinModel.findOne({
      user: userId,
    });
    if (existingNextOfKin) {
      const error = new AppError(400, 'fail', 'Next of kin already exist');
      return next(error, req, res, next);
    }

    const newNextOfKin = await NextOfKinModel.create({
      ...nextOfKin,
      user: userId,
    });
    return res.status(201).send({
      statusCode: 201,
      status: 'created',
      payload: nextOfKinDTO(newNextOfKin),
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};

export const updateNextOfKin = async (req, res, next) => {
  const { _id: userId } = req.user;
  const nextOfKin = req.body;
  try {
    const updatedNextOfKin = await NextOfKinModel.findOneAndUpdate(
      { user: userId },
      { ...nextOfKin },
      { new: true }
    );

    if (!updatedNextOfKin) {
      const error = new AppError(404, 'fail', 'Next of kin Dosent Exist');
      return next(error, req, res, next);
    }

    return res.status(200).send({
      statusCode: 200,
      status: 'success',
      payload: nextOfKinDTO(updatedNextOfKin),
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};

export const getNextOfKin = async (req, res, next) => {
  const { _id: userId } = req.user;
  try {
    const nextOfKin = await NextOfKinModel.findOne({ user: userId });

    if (!nextOfKin) {
      return res.status(404).send({
        statusCode: 404,
        status: 'fail',
        payload: null,
      });
    }

    return res.status(200).send({
      statusCode: 200,
      status: 'success',
      payload: nextOfKinDTO(nextOfKin),
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};
