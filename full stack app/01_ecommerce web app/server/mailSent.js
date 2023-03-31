const { createTransport }  = require("nodemailer")

const sendEmail = async (to, subject, text) => {
  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: 'xyz@gmail.com',
      pass: 'xyz',
    },
  });

  await transporter.sendMail({
    to,
    subject,
    text,
  });
};

// module.exports = sendEmail