import _ from 'lodash';
import UserModel from '../models/UserModel';
import AppError from '../utils/appError';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).send('invalid login credentials');

    // validate password
    const isValidPassword = await user.validatePassword(password)
    if (!isValidPassword) return res.status(400).send('invalid login credentials');

    user.token = user.generateToken();
    return res.status(200).send({
      status: 'success',
      payload: _.pick(user, [
        'first_name',
        'last_name',
        'email',
        'phone',
        'account_id',
        'token',
      ]),
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};

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
    return res.status(201).send({
      statusCode: 201,
      status: 'created',
      payload: _.pick(newUser, [
        'first_name',
        'last_name',
        'email',
        'phone',
        'account_id',
      ]),
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};
