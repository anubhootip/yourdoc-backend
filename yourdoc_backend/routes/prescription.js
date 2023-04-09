const express = require('express');
const router = express.Router();
const prescriptionService = require('../services/prescription');

router.get('/', async function (req, res, next) {
  const { patientId } = req.query;
  try {
    res.json(await prescriptionService.getByPatientId(patientId));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
})

module.exports = router;