/* eslint-disable no-underscore-dangle */
import _, { capitalize } from 'lodash';
import UserModel from '../models/UserModel';
import AppError from '../utils/appError';
import {
  sendActivationMail,
  sendEmailConfirmedMail,
  sendPasswordResetEmail,
} from '../utils/mailer';
import { createReferral } from './ReferralsController';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).send({ message: 'Incorrect Email or Password' });

    // validate password
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) return res.status(400).send({ message: 'Incorrect email or password' });

    // check that user has verified email
    if (!user.verified_email) {
      return res
        .status(401)
        .send({ message: 'You need to verify your Email to login' });
    }

    const token = user.generateToken();
    return res.status(200).send({
      status: 'success',
      payload: {
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
        token,
        accountId: user.account_id,
      },
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
    const { ref } = req.query;

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

    const token = newUser.generateToken({
      data: { email: newUser.email },
      expires: '24h',
    });

    if (ref) {
      createReferral(ref, newUser.account_id);
    }

    sendActivationMail({
      name: capitalize(newUser.first_name),
      email: newUser.email,
      token,
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

    const token = user.generateToken({
      data: { email: user.email },
      expires: '24h',
    });

    sendActivationMail({
      name: capitalize(user.first_name),
      email: user.email,
      token,
    });
    return res.status(200).send({
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
  const reqestUser = req.user;
  try {
    const user = await UserModel.findOneAndUpdate(
      { email: reqestUser.email },
      { verified_email: true }
    );
    if (!user) throw new Error('user does not exist');

    sendEmailConfirmedMail({
      name: capitalize(user.first_name),
      email: user.email,
    });

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

export const requestPasswordReset = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    const successResponse = {
      statusCode: 200,
      status: 'success',
      message: 'Password Request  sent',
    };
    if (!email) {
      return res.status(200).send(successResponse);
    }
    const token = user.generateToken({
      data: { email: user.email },
      expires: '24h',
    });
    sendPasswordResetEmail({ email, token });
    return res.status(200).send(successResponse);
  } catch (err) {
    return next(err, req, res, next);
  }
};

export const resetPassword = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const updatedUser = await UserModel.updateOne({ _id }, req.body);

    if (!updatedUser) {
      const error = new AppError(404, 'fail', 'Error Upating Password');
      return next(error, req, res, next);
    }

    return res.status(200).send({
      statusCode: 200,
      status: 'success',
      message: 'password updated',
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};
export const changePassword = async (req, res, next) => {
  const { user } = req;
  try {
    // validate password
    const isValidPassword = await user.validatePassword(
      req.body.currentPassword
    );
    if (!isValidPassword) return res.status(400).send({ message: 'Incorrect  password' });

    const updatedUser = await UserModel.updateOne(
      { _id: user._id },
      { password: req.body.newPassword }
    );

    if (!updatedUser) {
      const error = new AppError(404, 'fail', 'Error Upating Password');
      return next(error, req, res, next);
    }

    return res.status(200).send({
      statusCode: 200,
      status: 'success',
      message: 'password updated',
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};
