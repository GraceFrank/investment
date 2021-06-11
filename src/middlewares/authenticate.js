import jwt from 'jsonwebtoken';

export default function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ message: 'Auth Header not provided' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
    if (err) return res.status(401).send({ message: 'Invalid token' });

    req.user = decoded;
    next();
  });
}
