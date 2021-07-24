import UserModel from '../models/UserModel';
import AppError from '../utils/appError';

export const createAdminUser = async (req, res, next) => {
  const user = req.body;
  try {
    const existingUser = await UserModel.findOne({
      email: user.email,
    });
    if (existingUser) {
      const error = new AppError(400, 'fail', 'User Already exists');
      return next(error, req, res, next);
    }

    const newAdminUser = await UserModel.create({
      phone: user.phone,
      email: user.email,
      last_name: user.lastName,
      first_name: user.firstName,
      role: 'admin',
    });
    return res.status(201).send({
      statusCode: 201,
      status: 'created',
      payload: newAdminUser,
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};

export const updateUser = async (req, res, next) => {
  const user = req.body;
  const { id } = req.params;
  try {
    const updatedUser = await UserModel.findOneAndUpdate({ _id: id }, user, {
      new: true,
    });

    if (!updatedUser) {
      const error = new AppError(404, 'fail', 'invalid user id');
      return next(error, req, res, next);
    }

    return res.status(200).send({
      statusCode: 200,
      status: 'success',
      payload: updateUser,
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};

export const getAllUsers = async (req, res, next) => {
  const role = req.query.role || 'user';
  try {
    const users = await UserModel.find({ role }).select('-password').sort({ first_name: 'asc' });
    return res.status(200).send({
      statusCode: 200,
      status: 'success',
      payload: users,
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};

export const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id).select('-password');
    if (!user) {
      const error = new AppError(404, 'fail', 'invalid account id');
      return next(error, req, res, next);
    }
    return res.status(200).send({
      statusCode: 200,
      status: 'success',
      payload: user,
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};
