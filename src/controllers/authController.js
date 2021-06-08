import _ from 'lodash';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel';
import AppError from '../utils/appError';
import { sendActivationMail, sendEmailConfirmedMail } from '../utils/mailer';

const { PRIVATE_KEY } = process.env;

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).send('invalid login credentials');

    // validate password
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) return res.status(400).send({ message: 'invalid login credentials' });

    // check that user has verified email
    if (!user.verified_email) {
      return res
        .status(401)
        .send({ message: 'You need to verify your Email to login' });
    }

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

    const confirmationToken = newUser.generateToken({
      data: newUser.email,
      expires: '24h',
    });

    const confirmationUrl = `${process.env.UI_BASE_URL}/verification/?confirmation_token=${confirmationToken}`;
    sendActivationMail({
      name: newUser.first_name,
      email: newUser.email,
      confirmationUrl,
    });

    return res.status(201).send({
      statusCode: 201,
      status: 'created',
      confirmationUrl,
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

export const sendVerificationEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        statusCode: 200,
        status: 'success',
        message: 'email sent',
      });
    }
    if (user.verified_email) {
      return res.status(400).send({
        statusCode: 400,
        status: 'fail',
        message: 'Email already verified',
      });
    }

    const confirmationToken = user.generateToken({
      data: user.email,
      expires: '24h',
    });

    const confirmationUrl = `${process.env.UI_BASE_URL}/verification/?confirmation_token=${confirmationToken}`;
    sendActivationMail({
      name: user.first_name,
      email: user.email,
      confirmationUrl,
    });
    return res.status(200).send({
      confirmationUrl,
      statusCode: 200,
      status: 'success',
      message: 'email sent',
    });
  } catch (err) {
    const error = new AppError();
    return next(error, req, res, next);
  }
};

export const validateConfirmationToken = async (req, res, next) => {
  const { token } = req.body;

  try {
    const { data } = jwt.verify(token, PRIVATE_KEY);

    const user = await UserModel.findOneAndUpdate(
      { email: data },
      { verified_email: true }
    );
    if (!user) throw new Error('user does not exist');

    sendEmailConfirmedMail();
    return res.status(200).send({
      statusCode: 200,
      status: 'success',
      message: 'account verified',
    });
  } catch (err) {
    const error = new AppError(
      400,
      'fail',
      'Invalid or Expired Confrimation Link'
    );
    return next(error, req, res, next);
  }
};

// Todo! Forgot Password
// Toddo! send email after confirmation
