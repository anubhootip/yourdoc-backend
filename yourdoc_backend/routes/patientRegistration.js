var express = require('express');
var router = express.Router();
let client = require('@sendgrid/mail');
const bcrypt = require('bcrypt');
const user = require('../services/patientRegistration');

client.setApiKey(process.env.SENDGRID_API_KEY);

router.get('/', async function (req, res, next) {
  try {
    res.json(await user.getRegistrationInfo(req.body));
  } catch (err) {
    console.error(`Error while getting user info`, err.message);
    next(err);
  }
});


router.post('/', async function (req, res, next) {
  try {
    const { no_email } = req.body;
    const userPatientDbResponse = await user.createUserPatient(req.body);
    if (userPatientDbResponse != null && !no_email) {
      client.send({
        to: {
          email: userPatientDbResponse.email
        },
        from: {
          email: process.env.MY_EMAIL
        },
        templateId: 'd-6d25d2cb3e0440128ed1c2ef0efdacbb'
      }).then(() => {
        console.log("Email was sent");
      });
    }
    res.json(userPatientDbResponse);
  }
  catch (err) {
    console.error('Wrong Credentials', err.message);
    next(err);
  }
});

module.exports = router;