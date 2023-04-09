let express = require('express');
let router = express.Router();
const patient = require('../services/patient');

router.get('/', async function (req, res, next) {
  try {
    res.json(await patient.getMultiple());
  }
  catch (err) {
    console.error(`Error while getting patients `, err.message);
    next(err);
  }
});

router.post('/', async function (req, res, next) {
  try {
    res.json(await patient.create(req.body));
  } catch (err) {
    console.error(`Error while creating patient`, err.message);
    next(err);
  }
});

module.exports = router;
