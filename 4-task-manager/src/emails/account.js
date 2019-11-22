const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const sendgridAPIKey = process.env.SENDGRID_API_KEY;
try {
sgMail.setApiKey(sendgridAPIKey);

sgMail.send({
    to: 'android.tanskanen@gmail.com',
    from: 'android.tanskanen@gmail.com',
    subject: 'This is my first creation!',
    text: 'I hope this one actually get to to you.'
});
} catch (e) {
    console.log(e)
}