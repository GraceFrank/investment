import _ from "lodash";
import BankDetailsModel from "../models/BankDetailsModel";
import AppError from "../utils/appError";

function bankDetailsDTO(bankDetails) {
  return _.pick(bankDetails, ["account_name", "account_number", "bank_name"]);
}

export const createBankDetails = async (req, res, next) => {
  const { _id: userId } = req.user;
  const bankDetails = req.body;
  try {
    const existingBankDetails = await BankDetailsModel.findOne({
      user: userId,
    });
    if (existingBankDetails) {
      const error = new AppError(400, "fail", "Bank details already exist");
      return next(error, req, res, next);
    }

    const newBankDetails = await BankDetailsModel.create({
      ...bankDetails,
      user: userId,
    });
    return res.status(201).send({
      statusCode: 201,
      status: "created",
      payload: bankDetailsDTO(newBankDetails),
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};

export const updateBankDetails = async (req, res, next) => {
  const { _id: userId } = req.user;
  const bankDetails = req.body;
  try {
    const updatedBankDetails = await BankDetailsModel.findOneAndUpdate(
      { user: userId },
      { ...bankDetails },
      { new: true }
    );

    if (!updatedBankDetails) {
      const error = new AppError(404, "fail", "Bank details Dosent Exist");
      return next(error, req, res, next);
    }

    return res.status(200).send({
      statusCode: 200,
      status: "success",
      payload: bankDetailsDTO(updatedBankDetails),
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};

export const getBankDetails = async (req, res, next) => {
  const { _id: userId } = req.user;
  try {
    const bankDetails = await BankDetailsModel.findOne({ user: userId });

    if (!bankDetails) {
      return res.status(404).send({
        statusCode: 404,
        status: "fail",
        payload: null,
      });
    }

    return res.status(200).send({
      statusCode: 200,
      status: "success",
      payload: bankDetailsDTO(bankDetails),
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};
