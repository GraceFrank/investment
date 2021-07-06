import AssetFinanceModel from "../models/AssetFinanceModel";
import cloudinary from "../utils/cloudinary";
import { generateFileName } from "../utils/generateFileName";
import { sendUserAssetCreationNotification } from "../utils/mailer";

const { CLOUDINARY_BASE_PATH } = process.env;

export const createAssetFinance = async (req, res, next) => {
  try {
    const { _id: userId, email } = req.user;
    if (!req.files.proformaInvoice || !req.files.paymentProof) {
      return res.status(400).send({
        statusCode: 400,
        status: "Error",
        message: "Files paymentProof and proformaInvoice are required",
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
      status: "created",
      payload: newAssetFinance,
    });
  } catch (err) {
    console.log("ERRr", err);
    return next(err, req, res, next);
  }
};

export const getUserAssets = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { status } = req.query;
  const validStatus = ["active", "pending", "completed"];
  if (!validStatus.includes(status)) {
    return res.status(400).send({
      statusCode: 400,
      status: "Error",
      message: "Invalid query staus",
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
      status: "success",
      payload: {
        totalContribution,
        assets,
      },
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};
