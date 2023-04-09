var express = require('express');
var router = express.Router();
const appointment = require('../services/appointment');

router.get('/', async function (req, res, next) {
  const { patient_id, doctor_id } = req.query;
  try {
    if (patient_id) {
      res.json(await appointment.getByPatientId(patient_id));
    } else if (doctor_id) {
      res.json(await appointment.getByDoctorId(doctor_id));
    }
  }
  catch (err) {
    console.error(`Error while getting appointments `, err.message);
    next(err);
  }
});

router.post('/', async function (req, res, next) {
  try {
    console.log(req.body);
    res.json(await appointment.create(req.body));
  } catch (err) {
    console.error(`Error while creating appointment`, err.message);
    next(err);
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    res.json(await appointment.deleteA(req.params.id));
  } catch (err) {
    console.error(`Error while creating appointment`, err.message);
    next(err);
  }
})

module.exports = router;
