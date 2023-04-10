let express = require('express');
let router = express.Router();
const doctor = require('../services/doctor');

router.get('/', async function (req, res, next) {
    try {
        res.json(await doctor.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting doctors `, err.message);
        next(err);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        res.json(await doctor.getById(req.params.id));
    } catch (err) {
        console.error(`Error while getting doctors `, err.message);
        next(err);
    }
});

module.exports = router;
