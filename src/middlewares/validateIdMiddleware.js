import mongoose from 'mongoose';

export default function validateId(req, res, next) {
  const { id } = req.params;
  if (!id) return res.status(400).send({ message: 'Invalid id' });

  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) return res.status(400).send({ message: 'Invalid id' });

  return next();
}
