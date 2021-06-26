import AssetFinanceModel from "../models/AssetFinanceModel";
import cloudinary from "../utils/cloudinary";
import { generateFileName } from "../utils/generateFileName";

const { CLOUDINARY_BASE_PATH } = process.env;

export const createAssetFinance = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
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
    const newAssetFinance = await AssetFinanceModel.create({
      ...req.body,
      user: userId,
      proforma_invoice: {
        url: uploadedProformaInvoice.secure_url,
        public_id: uploadedProformaInvoice.public_id,
      },
      payment_proof: {
        url: uploadedPaymentProof.secure_url,
        public_id: uploadedPaymentProof.public_id,
      },
    });
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
  try {
    const activeAssetFinances = await AssetFinanceModel.find({
      user: userId,
      status: "active",
    });
    const pendingAssetFinances = await AssetFinanceModel.find({
      user: userId,
      status: "pending",
    });
    const completedAssetFinances = await AssetFinanceModel.find({
      user: userId,
      status: "completed",
    });

    return res.status(200).send({
      statusCode: 200,
      status: "success",
      payload: {
        totalContribution: 30000000,
        active: activeAssetFinances,
        pending: pendingAssetFinances,
        completed: completedAssetFinances,
      },
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};
