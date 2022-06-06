require("dotenv").config();
const nodemailer = require("nodemailer");

module.exports = {
  sendEmail(email, body) {
    let mailOptions = {
      from: `Testing Email`,
      to: `${email}`,
      subject: `Testing email`,
      html: body,
    };
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAILUSER,
        pass: process.env.MAILPASS,
      },
    });
    const mailer = transporter.sendMail(mailOptions);
    return mailer
      .then((result) => {
        return result.response;
      })
      .catch((error) => {
        console.log(error)
      });
  },
};
