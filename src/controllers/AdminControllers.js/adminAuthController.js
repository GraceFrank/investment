import UserModel from '../../models/UserModel';

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).send({ message: 'Incorrect Email or Password' });
    if (user.role !== 'admin') return res.status(400).send({ message: 'Unauthorized' });
    // validate password
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) return res.status(400).send({ message: 'Incorrect email or password' });

    // check that user has verified email
    if (!user.verified_email) {
      return res
        .status(401)
        .send({ message: 'You need to verify your Email to login' });
    }

    const token = user.generateToken();
    return res.status(200).send({
      status: 'success',
      payload: {
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
        token,
        accountId: user.account_id,
      },
    });
  } catch (err) {
    return next(err, req, res, next);
  }
};
