import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY environment variable is not set');
}

if (!process.env.RESEND_SENDER_EMAIL) {
  throw new Error('RESEND_SENDER_EMAIL environment variable is not set');
}

if (!process.env.RESEND_ADMIN_EMAIL) {
  throw new Error('RESEND_ADMIN_EMAIL environment variable is not set');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

export const SENDER_EMAIL = process.env.RESEND_SENDER_EMAIL;
export const ADMIN_EMAIL = process.env.RESEND_ADMIN_EMAIL;
