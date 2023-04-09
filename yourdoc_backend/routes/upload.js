const { Router } = require('express');
const router = Router();
const { allowedFileExts, allowedMaxFileSizeInBytes, create } = require('../services/upload');
const path = require('path');


router.get('/', async function (req, res, next) {
  const filename = req.query.file;
  res.download(`${__dirname}/../uploads/${filename}`)
})

router.post('/', async function (req, res, next) {
  const { uploaded_by, uploaded_for, file_url, file_path } = req.body;

  res.json(await create(file_url, file_path, uploaded_by, uploaded_for || uploaded_by));

});

module.exports = router;
