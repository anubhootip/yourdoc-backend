const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.json({ title: 'Express' });
});

router.get('/healthcheck', function (req, res) {
  res.json({ title: 'healthcheck working' });
});

module.exports = router;
