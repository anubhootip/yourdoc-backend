var express = require('express');
var router = express.Router();
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
        res.json(await admin.approveDoctor(req.params.id));
    }
    catch (err) {
        console.error(`Error while approving Doctor`, err.message);
        next(err);
    }
    
  });

  router.delete('/:id', async function (req, res, next) {
    try{
        console.log(req.body);
        res.json(await admin.rejectDoctor(req.params.id));
    }
    catch (err) {
        console.error(`Error while rejecting Doctor`, err.message);
        next(err);
    }

  });

  module.exports = router;