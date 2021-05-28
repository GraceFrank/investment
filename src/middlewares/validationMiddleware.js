export default function validationMiddleware(JoiSchema, payload) {
  return (req, res, next) => {
    const { error } = JoiSchema.validate(payload || req.body);

    if (error) {
      return res.status(400).send({
        status: 400,
        error: error.message,
        message: error.message,
        stack: process.env.NODE_ENV !== 'prod' && error.stack,
      });
    }

    return next();
  };
}
