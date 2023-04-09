const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const adminLoginService = require('../services/adminlogin');
const authenticate = require('../authenticateUser');


router.get('/', authenticate, async function (req, res, next) {
  try {
    res.json(await adminLoginService.getById(req.body));
  } catch (err) {
    console.error(`Error while getting Doctors Info `, err.message);
    next(err);
  }
});

router.post('/register', async function (req, res, next) {
  try {
    const { email, id, message } = await adminLoginService.adminRegister(req.body);

    res.json({ email, id, message });
  }
  catch (err) {
    console.error('Wrong Credentials', err.message);
    next(err);
  }
});


router.post('/', async function (req, res, next) {
  try {
    const { data, message } = await adminLoginService.adminInfo(req.body);
    if (!data) {
      return res.status(401).json({ message });
    }
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });

    console.log(accessToken);
    res.json({ data: accessToken, message });
  } catch (err) {
    console.error('Error while authenticating patient', err.message);
    next(err);
  }
});

module.exports = router;