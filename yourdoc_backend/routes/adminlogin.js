const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const user = require('../services/adminlogin');
const authenticate = require('../authenticateUser');


router.get('/', authenticate, async function (req, res, next) {
    try {
        res.json(await user.getById(req.body));
    } catch (err) {
        console.error(`Error while getting Doctors Info `, err.message);
        next(err);
    }
});


router.post('/', async function(req, res, next) {
    try {
      const patient = await user.adminInfo(req.body);
      if (patient == null) {
        return res.status(400).send('Wrong credentials');
      }
      const accessToken = jwt.sign(patient, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
      console.log(accessToken);
      res.json({ accessToken: accessToken });
    } catch (err) {
      console.error('Error while authenticating patient', err.message);
      next(err);
    }
  });

module.exports = router;