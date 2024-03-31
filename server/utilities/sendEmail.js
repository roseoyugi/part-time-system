const nodemailer = require("nodemailer");
const { transportAuth } = require("./Constants");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: transportAuth.user,
    pass: transportAuth.password,
  },
});

async function sendEmail(recipientName, recipientEmail, subject, message) {
  const mailOptions = {
    from: `"Claim Portal" <${transportAuth.user}>`,
    to: recipientEmail,
    subject: subject,
    text: "your email body content here",
    html: `
      <h1>Hello ${recipientName},</h1>
      <div>${message}</div>
      <br/>
      <p>Claim Portal System.</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = sendEmail;
