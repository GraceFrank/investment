import InvestmentModel from '../models/InvestmentModel';
import AppError from '../utils/appError';
import cloudinary from '../utils/cloudinary';
import { generateFileName } from '../utils/generateFileName';
import {
  calculateAmountDue,
  getDueDate,
  INTEREST_RATES,
} from '../utils/investmentUtils';
import {
  sendInvestmentCertificate,
  sendUserInvestmentNotification,
} from '../utils/mailer';
import { generateInvestmentCertificate } from '../utils/pdfCreator';
import { AddReferralBonus } from './ReferralsController';

const { CLOUDINARY_BASE_PATH } = process.env;

export const createInvestment = async (req, res, next) => {
  try {
    const { _id: userId, email } = req.user;
    if (!req.file) {
      return res.status(400).send({
        statusCode: 400,
        status: 'Error',
        message: 'File paymentProof isrequired',
      });
    }
    const uploadedPaymentProof = await cloudinary.uploader.upload(
      req.file.path,
      {
        public_id: `${CLOUDINARY_BASE_PATH}/investments/${generateFileName(
          userId
        )}`,
      }
    );
    const amountDue = calculateAmountDue(
      req.body.duration,
      req.body.amount_paid
    );
    const newInvestment = await InvestmentModel.create({
      ...req.body,
      user: userId,
      amount_due: amountDue,
      interest_rate: INTEREST_RATES[req.body.duration],
      payment_proof: {
        url: uploadedPaymentProof.secure_url,
        public_id: uploadedPaymentProof.public_id,
      },
    });
    // Todo Send admin notifications
    // sendAdminAssetCreationNotification()
    sendUserInvestmentNotification(email, req.user.first_name);
    return res.status(201).send({
      statusCode: 201,
      status: 'created',
      payload: newInvestment,
    });
  } catch (err) {
    console.log('ERRr', err);
    return next(err, req, res, next);
  }
};

export const getUserInvestments = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { status } = req.query;
  const validStatus = [ 'active', 'pending', 'completed' ];
  if (!validStatus.includes(status)) {
    return res.status(400).send({
      statusCode: 400,
      status: 'Error',
      message: 'Invalid query staus',
    });
  }
  try {
    const investments = await InvestmentModel.find({ user: userId, status });
    const totalContribution = investments.reduce(
      (acc, investment) => acc + investment.amount_paid,
      0
    );

    return res.status(200).send({
      statusCode: 200,
      status: 'success',
      payload: {
        totalContribution,
        investments,
      },
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};

export const getAllInvestments = async (req, res, next) => {
  try {
    const { status, page } = req.query;
    if (
      status
      && ![ 'active', 'declined', 'pending', 'completed' ].includes(status)
    ) {
      const error = new AppError(400, 'fail', 'invalid status');
      return next(error, req, res, next);
    }
    const search = status ? { status } : {};
    const pageNumber = page ? Number(page) - 1 : 0;
    const investments = await InvestmentModel.find(search)
      .populate({ path: 'user', select: 'first_name last_name account_id' })

      .limit(30)
      .skip(30 * pageNumber);
    // .sort({ createdAt: 'desc' });
    return res.status(200).send({
      statusCode: 200,
      status: 'success',
      payload: investments,
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};

export const activateInvestment = async (req, res, next) => {
  try {
    const investment = await InvestmentModel.findById(req.params.id);
    if (!investment) {
      const error = new AppError(404, 'fail', 'Investment not found');
      return next(error, req, res, next);
    }
    const startDate = Date.now();
    const endDate = getDueDate(startDate, investment.duration);
    const updatedInvestment = await InvestmentModel.findByIdAndUpdate(
      investment._id,
      {
        ...req.body,
        activation_date: startDate,
        due_date: endDate,
      },
      { runValidators: true, new: true }
    ).populate('user', '_id');

    if (req.body.status === 'active') {
      AddReferralBonus(updatedInvestment.user._id);
    }

    const details = {
      fullName: `${req.user.first_name}  ${req.user.last_name}`,
      amountPaid: Number(updatedInvestment.amount_paid).toLocaleString(),
      amountDue: Number(updatedInvestment.amount_due).toLocaleString(),
      startDate: new Date(
        updatedInvestment.activation_date
      ).toLocaleDateString(),
      endDate: new Date(updatedInvestment.due_date).toLocaleDateString(),
      duration: updatedInvestment.duration,
      interestRate: updatedInvestment.interest_rate,
    };

    // generate certificate if approved
    let certificate;
    if (updatedInvestment.status === 'active') {
      certificate = await generateInvestmentCertificate(details);
      details.attachment = certificate.filename;
    }
    // send approval email
    sendInvestmentCertificate({
      ...details,
      status: updatedInvestment.status,
      email: req.user.email,
      reason: req.body.decline_reason,
    });

    return res.status(200).send({
      statusCode: 200,
      status: 'success',
      payload: updatedInvestment,
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};

export const updateInvestment = async (req, res, next) => {
  try {
    const updatedInvestment = await InvestmentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedInvestment) {
      const error = new AppError(404, 'fail', 'Investment not found');
      return next(error, req, res, next);
    }

    return res.status(200).send({
      statusCode: 200,
      status: 'success',
      payload: updatedInvestment,
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};
