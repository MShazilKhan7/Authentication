const nodemailer = require("nodemailer");
const sendEmail = async (email, subject, text) => {
  console.log("sending email");
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent sucessfully");
    return true;
  } catch (error) {
    console.log("email not sent");
    console.log(error);
    return false;
  }
};

module.exports = { sendEmail };
