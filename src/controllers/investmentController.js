import InvestmentModel from '../models/InvestmentModel';
import cloudinary from '../utils/cloudinary';
import { generateFileName } from '../utils/generateFileName';
import { calculateAmountDue } from '../utils/investmentUtils';
import { sendUserInvestmentNotification } from '../utils/mailer';

const { CLOUDINARY_BASE_PATH } = process.env;

export const createInvestment = async (req, res, next) => {
  try {
    const { _id: userId, email } = req.user;
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
