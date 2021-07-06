import _ from "lodash";
import ProfileModel from "../models/ProfileModel";
import AppError from "../utils/appError";

function profileDTO(profile) {
  return _.pick(profile, [
    "title",
    "birthday",
    "nationality",
    "mothers_maiden_name",
    "photo_url",
    "bvn",
    "id_card_url",
    "photo_url",
    "address",
    "marital_status",
  ]);
}

export const createProfile = async (req, res, next) => {
  const { _id: userId } = req.user;
  const profile = req.body;
  try {
    const existingProfile = await ProfileModel.findOne({ user: userId });
    if (existingProfile) {
      const error = new AppError(400, "fail", "User Profile already exists.");
      return next(error, req, res, next);
    }

    const newProfile = await ProfileModel.create({ ...profile, user: userId });
    return res.status(201).send({
      statusCode: 201,
      status: "created",
      payload: profileDTO(newProfile),
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};

export const updateProfile = async (req, res, next) => {
  const { _id: userId } = req.user;
  const profile = req.body;
  try {
    const updatedProfile = await ProfileModel.findOneAndUpdate(
      { user: userId },
      { ...profile },
      { new: true }
    );

    if (!updatedProfile) {
      const error = new AppError(404, "fail", "Profile Dosent Exist");
      return next(error, req, res, next);
    }

    return res.status(200).send({
      statusCode: 200,
      status: "success",
      payload: profileDTO(updateProfile),
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};

export const getProfile = async (req, res, next) => {
  const { _id: userId } = req.user;
  try {
    const profile = await ProfileModel.findOne({ user: userId });

    if (!profile) {
      return res.status(404).send({
        statusCode: 404,
        status: "fail",
        payload: null,
      });
    }

    return res.status(200).send({
      statusCode: 200,
      status: "success",
      payload: profileDTO(profile),
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};
