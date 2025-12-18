import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

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
}
