const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./dist/app.module.js');
const { EmailService } = require('./dist/email/email.service.js');
require('dotenv').config();

async function main() {
  console.log('Using EMAIL_USER:', process.env.EMAIL_USER);
  
  const app = await NestFactory.createApplicationContext(AppModule);
  const emailService = app.get(EmailService);
  
  const donation = {
    id: 46,
    name: 'HARITHA SHREE',
    email: 'harithashreeit2001@gmail.com',
    phone: '9080356538',
    amount: 500,
    message: 'PAN: EMAPS910M | Txn: pay_L123456789',
    createdAt: new Date(),
  };
  
  try {
    console.log('Sending email...');
    await emailService.sendDonationReceiptEmail(donation);
    console.log('Email sent successfully!');
  } catch (err) {
    console.error('Failed to send email:', err);
  } finally {
    await app.close();
  }
}

main();
