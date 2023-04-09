let express = require('express');
let router = express.Router();
const admin = require('../services/admin');

router.get('/', async function (req, res, next) {
    try {
        res.json(await admin.getDoctors());
      }
      catch (err) {
        console.error(`Error while getting doctors `, err.message);
        next(err);
      }
  });

  router.get('/:id', async function (req, res, next) {
    try {
        res.json(await admin.getDoctor(req.params.id));
      }
      catch (err) {
        console.error(`Error while getting doctors `, err.message);
        next(err);
      }
  });

  router.put('/:id', async function (req, res, next) {
    try{
        console.log(req.body);
        const approved = await admin.approveDoctor(req.params.id);
        if (approved != null && !no_email) {
          client.send({
            to: {
              email: userPatientDbResponse.email
            },
            from: {
              email: process.env.MY_EMAIL
            },
            templateId: 'd-45fb664d9f964b559568f677f452e6f5'
          }).then(() => {
            console.log("Email was sent");
          });
        }
    }
    catch (err) {
        console.error(`Error while approving Doctor`, err.message);
        next(err);
    }
    
  });

  router.delete('/:id', async function (req, res, next) {
    try{
        console.log(req.body);
        const rejected = await admin.rejectDoctor(req.params.id);
        if (rejected != null && !no_email) {
          client.send({
            to: {
              email: userPatientDbResponse.email
            },
            from: {
              email: process.env.MY_EMAIL
            },
            templateId: 'd-f5cca6218d7e49fc96649b9f314a925e'
          }).then(() => {
            console.log("Email was sent");
          });
        }
    }
    catch (err) {
        console.error(`Error while rejecting Doctor`, err.message);
        next(err);
    }

  });

  module.exports = router;