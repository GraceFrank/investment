import ProfileModel from '../models/ProfileModel';
import AppError from '../utils/appError';
import cloudinary from '../utils/cloudinary';
import { generateFileName } from '../utils/generateFileName';

const { CLOUDINARY_BASE_PATH } = process.env;

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
        message: 'You have no Profile Record',
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
    const profiles = await ProfileModel.find()
      .populate('user', '-password')
      .sort({ date: 'desc' });
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

export const uploadIdCard = async (req, res, next) => {

  //Todo! do not upload file until  profile is found
  try {
    const { _id: userId } = req.user;
    if (!req.file) {
      return res.status(400).send({
        statusCode: 400,
        status: 'Error',
        message: 'File idCard isrequired',
      });
    }
    const uploadedIdCard = await cloudinary.uploader.upload(
      req.file.path,
      {
        public_id: `${CLOUDINARY_BASE_PATH}/identification/${generateFileName(
          userId
        )}`,
      }
    );
    const updatedProfile = await ProfileModel.findOneAndUpdate(
      { user: userId },
      {
        ...req.body,
        id_card: {
          url: uploadedIdCard.secure_url,
          public_id: uploadedIdCard.public_id,
        },
      }, 
      { new: true, runValidators: true}
    );
    if (!updatedProfile) {
      const error = new AppError(404, 'fail', 'Create Profile First');
      return next(error, req, res, next);
    }

    return res.status(200).send({
      statusCode: 200,
      status: 'Updated',
      payload: updatedProfile,
    });
  } catch (err) {
    console.log('ERRr', err);
    return next(err, req, res, next);
  }
};
