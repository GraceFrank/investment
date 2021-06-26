import dotenv from 'dotenv';
import Mailgun from 'mailgun-js';
import capitalize from './Capitalize';

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
      name: capitalize(name),
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
      firstName: capitalize(name),
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

export const sendUserAssetCreationNotification = (email, name) => {
  const data = {
    from: 'Abudanza <support@mg.abudanza.africa>',
    to: email,
    subject: 'Asset Fincance Created',
    template: 'asset_created_user',
    'h:X-Mailgun-Variables': JSON.stringify({
      assetsUrl: `${UI_BASE_URL}/assets`,
      name: capitalize(name),
    }),
  };

  return mailer.messages().send(data, (error, body) => {
    if (error) return Promise.reject(error);
    return Promise.resolve(body);
  });
};
export const sendAdminAssetCreationNotification = ({ emails, assetId }) => {
  const data = {
    from: 'Abudanza <support@mg.abudanza.africa>',
    to: emails,
    subject: 'Asset Fincance Created',
    template: 'asset_creation_admin',
    'h:X-Mailgun-Variables': JSON.stringify({
      assetsUrl: `${UI_BASE_URL}/admin/assets/${assetId}`,
    }),
  };

  return mailer.messages().send(data, (error, body) => {
    if (error) return Promise.reject(error);
    return Promise.resolve(body);
  });
};
