import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel';

export default function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ message: 'Auth Header not provided' });

  const token = authHeader.split(' ')[1];
  return jwt.verify(token, process.env.PRIVATE_KEY, async (err, decoded) => {
    if (err) return res.status(401).send({ message: 'Invalid token' });

    try {
      const user = await UserModel.findOne({ email: decoded.email });

      req.user = user;
      return next();
    } catch (error) {
      return res.status(500).send({ message: 'Errror Validating token' });
    }
  });
}
