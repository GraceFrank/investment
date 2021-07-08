export default function authenticateToken(req, res, next) {
  const { user } = req;
  if (user.role !== 'admin') return res.status(403).send({ message: 'Unauthorized' });

  return next();
}
