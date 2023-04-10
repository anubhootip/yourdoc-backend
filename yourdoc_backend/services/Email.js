const express = require("express");


const myemail = process.env.SENDER_EMAIL;
const mypassword = process.env.APPLICATION_PASSWORD;

exports.sendEmail = function (name, recipient_email, flag) {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: myemail,
      pass: mypassword,
    },
  });

  let mail_configs = {};

  if (flag) {
    mail_configs = {
      from: myemail,
      to: recipient_email,
      subject: "CONGRATULATIONS !!! YOUR REQUEST HAS BEEN APPROVED",
      html: `<!DOCTYPE html>
      <html>
        <head>
          <title>Your Request has been approved by YOURDOC.</title>
        </head>
        <body>
          <h1>Dear ${name},</h1>
          <p>Welcome to YOURDOC family.</p>
          <p>You can now access your portal and take appointments for you hospital.</p>
          <p></p>
          <img src="https://techcrunch.com/wp-content/uploads/2020/09/GettyImages-1211152561.jpg?w=1390&crop=1">
          <p>Thanks for showing interest in YOURDOC!</p>
          <br>
          <br>
          <p>Team YOURDOC!</p>
        </body>
      </html>`,
    };
  }
  else {
    mail_configs = {
      from: myemail,
      to: recipient_email,
      subject: "SORRY !!! YOUR REQUEST HAS BEEN REJECTED",
      html: `<!DOCTYPE html>
      <html>
        <head>
          <title>Your Request has been rejected by YOURDOC.</title>
        </head>
        <body>
          <h1>Dear ${name},</h1>
          <p>Your Request could not be processed.</p>
          <p>You can now re-register with proper documents to verify your authenticity.</p>
          <p></p>
          <img src="https://techcrunch.com/wp-content/uploads/2020/09/GettyImages-1211152561.jpg?w=1390&crop=1">
          <p>Thanks for showing interest in YOURDOC!</p>
          <br>
          <br>
          <p>Team YOURDOC!</p>
        </body>
      </html>`
    };
  }

  transporter.sendMail(mail_configs, function (error, info) {
    if (error) {
      console.log(error);
      return reject({ message: `An error has occured` });
    }
    return resolve({ message: "Email sent succesfuly" });
  });
};
