const express = require('express');
const router = express.Router();
const searchService = require("../services/search");

router.get('/', async (req, res, next) => {
    try {
        const { q } = req.query;
        res.json(await searchService.search(q));
    } catch (err) {
        console.error(`Error while getting doctor`, err.message);
        next(err);
    }
})
// searching doctors by name
router.get('/name/:name', async (req, res, next) => {
    try {
        console.log("Param:" + req.params.name);
        const docName = req.params.name;
        console.log("Doctor Name" + docName);
        res.json(await searchService.searchName(docName));
    } catch (err) {
        console.log("Error in Doc Api");
        console.error(`Error while getting doctor`, err.message);
        next(err);
    }
});

// searching doctors by specialization
router.get('/specialization/:spec', async (req, res, next) => {
    try {
        console.log("Param:" + req.params);
        const spec = req.params.spec;
        res.json(await searchService.getDocSpec(spec));
    } catch (err) {
        console.error(`Error while searching doctors by specialization`, err.message);
        next(err);
    }
});

// searching doctors by pincode
router.get('/pincode/:pincode', async (req, res, next) => {
    try {
        console.log("Param:" + req.params);
        const pinCode = req.params.pincode;
        res.json(await searchService.searchPinCode(pinCode));
    } catch (err) {
        console.error(`Error while searching doctors by pincode`, err.message);
        next(err);
    }
});


module.exports = router;
