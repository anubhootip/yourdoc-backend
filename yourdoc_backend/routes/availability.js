let express = require('express');
let router = express.Router();
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
    await availability.createByPool(availabilities.map(av => ({ ...av, doctor_id })));

    res.json({ message: 'success' });
  } catch (err) {
    console.error(`Error while creating availability`, err.message);
    next(err);
  }
});

router.put('/multiple', async function (req, res, next) {
  const { doctor_id, availabilities } = req.body;
  try {
    await availability.updateOrCreateByPool(availabilities.map(av => ({ ...av, doctor_id })));

    res.json({ message: 'success' });
  } catch (err) {
    console.error(`Error while creating availability`, err.message);
    next(err);
  }
});

module.exports = router;