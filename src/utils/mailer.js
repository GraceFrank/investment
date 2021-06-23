import dotenv from 'dotenv';
import Mailgun from 'mailgun-js';

dotenv.config();

const API_KEY = process.env.SMTP_API_KEY;
const DOMAIN = process.env.SMTP_DOMAIN_NAME;
const mailer = Mailgun({ apiKey: API_KEY, domain: DOMAIN });
const { UI_BASE_URL } = process.env;

export const sendActivationMail = ({ name, email, token }) => {
  const data = {
    from: 'Abudanza <support@mg.abudanza.africa>',
    to: email,
    subject: 'Abudanza: Confirm Your Email',
    template: 'activate_account_request',
    'h:X-Mailgun-Variables': JSON.stringify({
      name,
      confirmation_url: `${UI_BASE_URL}/verification/?confirmation_token=${token}`,
    }),
  };

  return mailer.messages().send(data, (error, body) => {
    if (error) return Promise.reject(error);
    return Promise.resolve(body);
  });
};

export const sendEmailConfirmedMail = ({ name, email }) => {
  const data = {
    from: 'Abudanza <support@mg.abudanza.africa>',
    to: email,
    subject: 'Abudanza Account Activated',
    template: 'email_confirmed',
    'h:X-Mailgun-Variables': JSON.stringify({
      firstName: name,
      loginUrl: `${UI_BASE_URL}/login/`,
    }),
  };
  return mailer.messages().send(data, (error, body) => {
    if (error) return Promise.reject(error);
    return Promise.resolve(body);
  });
};

export const sendPasswordResetEmail = ({ email, token }) => {
  const data = {
    from: 'Abudanza <support@mg.abudanza.africa>',
    to: email,
    subject: 'Abudanza Password Reset',
    template: 'password_reset',
    'h:X-Mailgun-Variables': JSON.stringify({
      password_reset_url: `${UI_BASE_URL}/reset-password/?reset_token=${token}`,
    }),
  };

  return mailer.messages().send(data, (error, body) => {
    if (error) return Promise.reject(error);
    return Promise.resolve(body);
  });
};
