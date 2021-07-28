import dotenv from 'dotenv';
import Mailgun from 'mailgun-js';
import capitalize from './Capitalize';
import { getApprovalText, getDeclineText } from './emails/assetFinacesApproval';
import {
  getInvestmentApprovalText,
  getInvestmentDeclineText,
} from './emails/investmentApproval';

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
    subject: 'New Asset Fincance Created',
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

export const sendUserInvestmentNotification = (email, name) => {
  const data = {
    from: 'Abudanza <support@mg.abudanza.africa>',
    to: email,
    subject: 'Investment Notification',
    template: 'investment_creation_user',
    'h:X-Mailgun-Variables': JSON.stringify({
      investmentUrl: `${UI_BASE_URL}/investments`,
      name: capitalize(name),
    }),
  };

  return mailer.messages().send(data, (error, body) => {
    if (error) return Promise.reject(error);
    return Promise.resolve(body);
  });
};
export const sendAdminInvestmentNotification = (emails, investmentId) => {
  const data = {
    from: 'Abudanza <support@mg.abudanza.africa>',
    to: emails.join(', '),
    subject: 'New Investment Notification',
    template: 'investment_creation_admin',
    'h:X-Mailgun-Variables': JSON.stringify({
      investmentUrl: `${UI_BASE_URL}/admin/investments/${investmentId}`,
    }),
  };

  return mailer.messages().send(data, (error, body) => {
    if (error) return Promise.reject(error);
    return Promise.resolve(body);
  });
};

export const sendAssetFinanceCertificate = (data) => {
  const generateText = data.status === 'active' ? getApprovalText : getDeclineText;
  const text = generateText(data);
  const mailDetails = {
    from: 'Abudanza <support@mg.abudanza.africa>',
    to: data.email,
    subject: 'Thank you for Asset Finance',
    template: 'asset_finance_approval',
    attachment: data.attachment,
    'h:X-Mailgun-Variables': JSON.stringify({
      name: data.fullName,
      text,
      loginUrl: `${UI_BASE_URL}/login/`,
    }),
  };

  return mailer.messages().send(mailDetails, (error, body) => {
    if (error) return Promise.reject(error);
    return Promise.resolve(body);
  });
};

export const sendInvestmentCertificate = (data) => {
  const generateText = data.status === 'active'
    ? getInvestmentApprovalText
    : getInvestmentDeclineText;
  const text = generateText(data);
  const mailDetails = {
    from: 'Abudanza <support@mg.abudanza.africa>',
    to: data.email,
    subject: 'Thank you for Asset Finance',
    template: 'asset_finance_approval',
    attachment: data.attachment,
    'h:X-Mailgun-Variables': JSON.stringify({
      name: data.fullName,
      text,
      loginUrl: `${UI_BASE_URL}/login/`,
    }),
  };
  return mailer.messages().send(mailDetails, (error, body) => {
    if (error) return Promise.reject(error);
    return Promise.resolve(body);
  });
};
