import UserModel from '../models/UserModel';
import AppError from '../utils/appError';

export const login = async (req, res) => res.status(200).send(true);

export const register = async (req, res, next) => {
  try {
    const {
      email, phone, password, firstName, lastName
    } = req.body;

    // check if user with phone or email already exists
    const existingUser = await UserModel.findOne({
      $or: [ { email }, { phone } ],
    });
    if (existingUser) {
      const error = new AppError(
        400,
        'fail',
        'User with email or phone Already exists'
      );
      return next(error, req, res, next);
    }

    // create new user
    const newUser = await UserModel.create({
      email,
      phone,
      password,
      first_name: firstName,
      last_name: lastName,
    });
    return res
      .status(201)
      .send({ statusCode: 201, status: 'created', payload: newUser });
  } catch (err) {
    return next(err, req, res, next);
  }
};
