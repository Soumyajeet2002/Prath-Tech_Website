const nodemailer = require('nodemailer');

function readBooleanEnv(value, defaultValue = false) {
  if (typeof value === 'undefined') return defaultValue;
  const normalized = String(value).trim().toLowerCase();
  return ['1', 'true', 'yes', 'y', 'on'].includes(normalized);
}

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure = readBooleanEnv(process.env.SMTP_SECURE, port === 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error('SMTP configuration missing: require SMTP_HOST, SMTP_USER, SMTP_PASS');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass }
  });
}

function buildMailOptions({ from, to, subject, text, html }) {
  return {
    from,
    to,
    subject,
    text,
    html
  };
}

module.exports = { createTransporter, buildMailOptions };


