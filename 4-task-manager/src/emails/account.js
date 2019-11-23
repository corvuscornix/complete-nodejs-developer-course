const sgMail = require('@sendgrid/mail');
try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

} catch (e) {
    console.log(e);
}

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'android.tanskanen@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}, Let me know how you get along with the app.`
    });
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'android.tanskanen@gmail.com',
        subject: `We\'re sad to see you go ${name}!`,
        text: `We would hugely appreciate it if you can tell us how to improve the service to keep you longer.\n\nHopefully we see later ${name}!\n\nBest regards,\nAntero Tanskanen`
    });
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}