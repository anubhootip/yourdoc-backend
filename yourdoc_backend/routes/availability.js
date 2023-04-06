var express = require('express');
var router = express.Router();
const availability = require('../services/availability');

router.get('/', async function (req, res, next) {
  const { doctor_id } = req.query;
  try {
    res.json(await availability.getByDoctorId(doctor_id));
  } catch (err) {
    console.error(`Error while getting availability `, err.message);
    next(err);
  }
});

router.post('/multiple', async function (req, res, next) {
  const { doctor_id, availabilities } = req.body;
  try {
    const createdAvailabilities = [];
    for (let i = 0; i < availabilities.length; i++) {
      createdAvailabilities.push(await availability.create({ ...availabilities[i], doctor_id }))
    }
    res.json(createdAvailabilities);
  } catch (err) {
    console.error(`Error while creating availability`, err.message);
    next(err);
  }
});

router.put('/multiple', async function (req, res, next) {
  const { doctor_id, availabilities } = req.body;
  try {
    const updatedAvailabilities = [];
    for (let i = 0; i < availabilities.length; i++) {
      updatedAvailabilities.push(await availability.updateOrCreate({ ...availabilities[i], doctor_id }))
    }
    res.json(updatedAvailabilities);
  } catch (err) {
    console.error(`Error while creating availability`, err.message);
    next(err);
  }
});

module.exports = router;