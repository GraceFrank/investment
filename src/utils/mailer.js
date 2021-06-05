import Mailgun from 'mailgun-js';
import generateConfirmationEmail from '../constants/activation_email';

const API_KEY = process.env.SMTP_API_KEY;
const DOMAIN = process.env.SMTP_DOMAIN_NAME;
const mailer = Mailgun({ apiKey: API_KEY, domain: DOMAIN });

export const sendActivationMail = ({ name, email, confirmationUrl }) => {
  const data = {
    from: 'Abudanza <support@mg.abudanza.africa>',
    to: email,
    subject: 'Confirm Your Email',
    text: 'Confirm your email',
    html: generateConfirmationEmail(name, confirmationUrl),
  };

  return mailer.messages().send(data, (error, body) => {
    if (error) return Promise.reject(error);
    return Promise.resolve(body);
  });
};
