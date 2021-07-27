import AssetFinanceModel from '../models/AssetFinanceModel';
import cloudinary from '../utils/cloudinary';
import { generateFileName } from '../utils/generateFileName';
import {
  sendAssetFinanceCertificate,
  sendUserAssetCreationNotification,
} from '../utils/mailer';
import AppError from '../utils/appError';
import { generateAssetFinanceCertificate } from '../utils/pdfCreator';
import { getDueDate } from '../utils/investmentUtils';

const { CLOUDINARY_BASE_PATH } = process.env;

export const createAssetFinance = async (req, res, next) => {
  try {
    const { _id: userId, email } = req.user;
    if (!req.files.proformaInvoice || !req.files.paymentProof) {
      return res.status(400).send({
        statusCode: 400,
        status: 'Error',
        message: 'Files paymentProof and proformaInvoice are required',
      });
    }
    const proformaInvoice = req.files.proformaInvoice[0];
    const paymentProof = req.files.paymentProof[0];

    const uploadedProformaInvoice = await cloudinary.uploader.upload(
      proformaInvoice.path,
      {
        public_id: `${CLOUDINARY_BASE_PATH}/porformer_invoice/${generateFileName(
          userId
        )}`,
      }
    );
    const uploadedPaymentProof = await cloudinary.uploader.upload(
      paymentProof.path,
      {
        public_id: `${CLOUDINARY_BASE_PATH}/payment_proof/${generateFileName(
          userId
        )}`,
      }
    );
    const amountPaid = (req.body.cost * 60) / 100;
    const newAssetFinance = await AssetFinanceModel.create({
      ...req.body,
      user: userId,
      amount_paid: amountPaid,
      proforma_invoice: {
        url: uploadedProformaInvoice.secure_url,
        public_id: uploadedProformaInvoice.public_id,
      },
      payment_proof: {
        url: uploadedPaymentProof.secure_url,
        public_id: uploadedPaymentProof.public_id,
      },
    });
    // Todo Send admin notifications
    // sendAdminAssetCreationNotification()
    sendUserAssetCreationNotification(email, req.user.first_name);
    return res.status(201).send({
      statusCode: 201,
      status: 'created',
      payload: newAssetFinance,
    });
  } catch (err) {
    console.log('ERRr', err);
    return next(err, req, res, next);
  }
};

export const getUserAssets = async (req, res, next) => {
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
    const assets = await AssetFinanceModel.find({ user: userId, status });
    const totalContribution = assets.reduce(
      (acc, asset) => acc + asset.amount_paid,
      0
    );

    return res.status(200).send({
      statusCode: 200,
      status: 'success',
      payload: {
        totalContribution,
        assets,
      },
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};

export const updateAssets = async (req, res, next) => {
  try {
    const updatedAsset = await AssetFinanceModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedAsset) {
      const error = new AppError(404, 'fail', 'Asset not found');
      return next(error, req, res, next);
    }

    return res.status(200).send({
      statusCode: 200,
      status: 'success',
      payload: updatedAsset,
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};

export const getAllAssets = async (req, res, next) => {
  try {
    const { status, page } = req.query;
    if (
      status
      && ![ 'approved', 'declined', 'pending', 'completed' ].includes(status)
    ) {
      const error = new AppError(400, 'fail', 'invalid status');
      return next(error, req, res, next);
    }
    const search = status ? { status } : {};
    const pageNumber = page ? Number(page) - 1 : 0;
    const assets = await AssetFinanceModel.find(search)
      .limit(30)
      .skip(30 * pageNumber);
    // .sort({ createdAt: 'desc' });
    return res.status(200).send({
      statusCode: 200,
      status: 'success',
      payload: assets,
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};

export const approveAssetFinance = async (req, res, next) => {
  try {
    const startDate = Date.now();
    const endDate = getDueDate(startDate, 90);
    const updatedAsset = await AssetFinanceModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body, activation_date: startDate, due_date: endDate },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedAsset) {
      const error = new AppError(404, 'fail', 'Asset not found');
      return next(error, req, res, next);
    }

    const details = {
      fullName: `${req.user.first_name}  ${req.user.last_name}`,
      amountPaid: Number(updatedAsset.amount_paid).toLocaleString(),
      itemPrice: Number(updatedAsset.cost).toLocaleString(),
      startDate: new Date(updatedAsset.activation_date).toLocaleDateString(),
      endDate: new Date(updatedAsset.due_date).toLocaleDateString(),
      duration: updatedAsset.duration,
      asset: `${updatedAsset.brand} ${updatedAsset.model} ${updatedAsset.category}`,
      vendor: `${updatedAsset.vendor_name} ${updatedAsset.vendor_city} ${updatedAsset.vendor_state}`,
    };
    // generate certificate if approved
    let certificate;
    if (updatedAsset.status === 'approved') {
      certificate = await generateAssetFinanceCertificate(details);
      details.attachment = certificate.filename;
    }

    // send approval email
    sendAssetFinanceCertificate({
      ...details,
      status: updatedAsset.status,
      email: req.user.email,
      reason: req.body.decline_reason,
    });

    return res.status(200).send({
      statusCode: 200,
      status: 'success',
      payload: updatedAsset,
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};
