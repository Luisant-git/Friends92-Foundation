const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./dist/app.module.js');
const { EmailService } = require('./dist/email/email.service.js');
require('dotenv').config();

async function main() {
  console.log('Using EMAIL_USER:', process.env.EMAIL_USER);

  const app = await NestFactory.createApplicationContext(AppModule);
  const emailService = app.get(EmailService);

  const subscription = {
    id: 1,
    name: 'Arun Karthik',
    email: 'arunselvammca@gmail.com',   // <-- change to your test email
    phone: '9080356538',
    amount: 1000,
    transactionId: 'pay_SUB123456789',
    createdAt: new Date(),
  };

  try {
    console.log('Sending subscription receipt email...');
    await emailService.sendSubscriptionReceiptEmail(subscription);
    console.log('Subscription receipt email sent successfully!');
  } catch (err) {
    console.error('Failed to send email:', err);
  } finally {
    await app.close();
  }
}

main();
