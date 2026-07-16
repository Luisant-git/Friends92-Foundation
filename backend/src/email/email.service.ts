import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { generateReceiptPdf } from './pdf-generator';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendVolunteerSelectionEmail(email: string, password: string, name: string) {
    const loginUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/volunteer/login`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'You have been selected as a Volunteer!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">Congratulations ${name}!</h2>
          <p>You have been selected as a volunteer for Friends92 Foundation.</p>
          <p>Your account has been created with the following credentials:</p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Password:</strong> ${password}</p>
          </div>
          <p style="color: #dc2626;"><strong>Note:</strong> Your account is currently inactive. You will receive another email once the admin activates your account.</p>
          <p>Once activated, you can login to your volunteer dashboard using the button below:</p>
          <a href="${loginUrl}" style="display: inline-block; background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Login to Volunteer Dashboard</a>
          <p>Best regards,<br>Friends92 Foundation Team</p>
        </div>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendVolunteerActivationEmail(email: string, password: string, name: string) {
    const loginUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/volunteer/login`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Volunteer Account has been Activated!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">Welcome ${name}!</h2>
          <p>Great news! Your volunteer account has been activated.</p>
          <p>You can now login to your volunteer dashboard with the following credentials:</p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Password:</strong> ${password}</p>
          </div>
          <a href="${loginUrl}" style="display: inline-block; background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Login to Volunteer Dashboard</a>
          <p>Best regards,<br>Friends92 Foundation Team</p>
        </div>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendPasswordResetEmail(email: string, name: string, resetUrl: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset Your Volunteer Password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">Password Reset Request</h2>
          <p>Hi ${name},</p>
          <p>We received a request to reset your password. Click the button below to create a new password:</p>
          <a href="${resetUrl}" style="display: inline-block; background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Reset Password</a>
          <p>If you didn't request this, please ignore this email.</p>
          <p>This link will expire in 24 hours.</p>
          <p>Best regards,<br>Friends92 Foundation Team</p>
        </div>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendDonationReceiptEmail(donation: {
    id: number;
    name: string;
    email: string;
    phone: string;
    amount: number;
    message?: string | null;
    createdAt: Date;
  }) {
    const pdfBuffer = await generateReceiptPdf(donation);
    const fromEmail = process.env.EMAIL_USER || 'wondwebtechmail@gmail.com';
    const mailOptions = {
      from: `"GPTCK 92 TRUST" <${fromEmail}>`,
      to: donation.email,
      subject: `Donation Receipt - GPTCK 92 TRUST (Receipt No: R${donation.id.toString().padStart(4, '0')})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6;">
          <h2 style="color: #1e3a8a;">Thank You for Your Support!</h2>
          <p>Dear Mr./Ms. ${donation.name},</p>
          <p>We gratefully acknowledge your generous donation of <strong>₹${donation.amount.toLocaleString('en-IN')}</strong> to the <strong>GPTCK 92 TRUST</strong>.</p>
          <p>Your contribution plays a vital role in enabling our programs and supporting students and communities.</p>
          <p>Please find attached your 80G tax exemption receipt for this donation.</p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Receipt No:</strong> R${donation.id.toString().padStart(4, '0')}</p>
            <p style="margin: 5px 0;"><strong>Amount:</strong> ₹${donation.amount.toLocaleString('en-IN')}</p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(donation.createdAt).toLocaleDateString('en-GB')}</p>
          </div>
          <p>If you have any questions or require further assistance, please contact us at <a href="mailto:gptck92trust@gmail.com">gptck92trust@gmail.com</a>.</p>
          <p>Warm regards,<br><strong>GPTCK 92 TRUST Team</strong></p>
        </div>
      `,
      attachments: [
        {
          filename: `Donation_Receipt_R${donation.id.toString().padStart(4, '0')}.pdf`,
          content: pdfBuffer,
        },
      ],
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendSubscriptionReceiptEmail(subscription: {
    id: number;
    name: string;
    email: string;
    phone: string;
    amount: number;
    transactionId?: string | null;
    createdAt: Date;
  }) {
    const pdfBuffer = await generateReceiptPdf({
      id: subscription.id,
      name: subscription.name,
      email: subscription.email,
      phone: subscription.phone,
      amount: subscription.amount,
      message: subscription.transactionId ? `Txn: ${subscription.transactionId}` : null,
      createdAt: subscription.createdAt,
      receiptType: 'SUBSCRIPTION',
    });
    const fromEmail = process.env.EMAIL_USER || 'wondwebtechmail@gmail.com';
    const mailOptions = {
      from: `"GPTCK 92 TRUST" <${fromEmail}>`,
      to: subscription.email,
      subject: `Subscription Receipt - GPTCK 92 TRUST (Receipt No: R${subscription.id.toString().padStart(4, '0')})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6;">
          <h2 style="color: #1e3a8a;">Thank You for Your Membership!</h2>
          <p>Dear Mr./Ms. ${subscription.name},</p>
          <p>We are pleased to confirm your Alumni Membership subscription of <strong>₹${subscription.amount.toLocaleString('en-IN')}</strong> to the <strong>GPTCK 92 TRUST</strong>.</p>
          <p>Please find attached your subscription receipt.</p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Receipt No:</strong> R${subscription.id.toString().padStart(4, '0')}</p>
            <p style="margin: 5px 0;"><strong>Amount:</strong> ₹${subscription.amount.toLocaleString('en-IN')}</p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(subscription.createdAt).toLocaleDateString('en-GB')}</p>
          </div>
          <p>If you have any questions, please contact us at <a href="mailto:gptck92trust@gmail.com">gptck92trust@gmail.com</a>.</p>
          <p>Warm regards,<br><strong>GPTCK 92 TRUST Team</strong></p>
        </div>
      `,
      attachments: [
        {
          filename: `Subscription_Receipt_R${subscription.id.toString().padStart(4, '0')}.pdf`,
          content: pdfBuffer,
        },
      ],
    };

    await this.transporter.sendMail(mailOptions);
  }
}

