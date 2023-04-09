let express = require('express');
let router = express.Router();
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
    const appointmentResponse = await appointment.create(req.body);
    if(appointmentResponse != null && !no_email){
      client.send({
        to: {
          email: userPatientDbResponse.email
        },
        from: {
          email: process.env.MY_EMAIL
        },
        templateId: 'd-27f4de48d21447ff836c5df2e76724a7'
      }).then(() => {
        console.log("Email was sent");
      });
    }
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
