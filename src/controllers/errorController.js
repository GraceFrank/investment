/* eslint-disable no-unused-vars, no-param-reassign */
export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: process.env.NODE_ENV !== "prod" && err.stack,
  });
};
