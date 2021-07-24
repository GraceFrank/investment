import ProfileModel from '../models/ProfileModel';
import AppError from '../utils/appError';

export const createProfile = async (req, res, next) => {
  const { _id: userId } = req.user;
  const profile = req.body;
  try {
    const existingProfile = await ProfileModel.findOne({ user: userId });
    if (existingProfile) {
      const error = new AppError(400, 'fail', 'User Profile already exists.');
      return next(error, req, res, next);
    }

    const newProfile = await ProfileModel.create({ ...profile, user: userId });
    return res.status(201).send({
      statusCode: 201,
      status: 'created',
      payload: newProfile,
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};

export const updateProfile = async (req, res, next) => {
  const search = req.params.id
    ? { _id: req.params.id }
    : { user: req.user._id };
  const profile = req.body;
  try {
    const updatedProfile = await ProfileModel.findOneAndUpdate(
      search,
      { ...profile },
      { new: true }
    );

    if (!updatedProfile) {
      const error = new AppError(404, 'fail', 'Profile Dose not Exist');
      return next(error, req, res, next);
    }

    return res.status(200).send({
      statusCode: 200,
      status: 'success',
      payload: updatedProfile,
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};

export const getProfile = async (req, res, next) => {
  const search = req.params.id
    ? { _id: req.params.id }
    : { user: req.user._id };
  try {
    const profile = await ProfileModel.findOne(search).populate(
      'user',
      '-password'
    );

    if (!profile) {
      return res.status(404).send({
        statusCode: 404,
        status: 'fail',
        payload: null,
      });
    }

    return res.status(200).send({
      statusCode: 200,
      status: 'success',
      payload: profile,
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};

export const getProfiles = async (req, res, next) => {
  try {
    const profiles = await ProfileModel.find().populate('user', '-password');
    if (!profiles) {
      return res.status(404).send({
        statusCode: 404,
        status: 'fail',
        payload: null,
      });
    }

    return res.status(200).send({
      statusCode: 200,
      status: 'success',
      payload: profiles,
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};
