const { Router } = require('express');
const router = Router();
const multer = require('multer');
const { allowedFileExts, allowedMaxFileSizeInBytes, create } = require('../services/upload');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    if (allowedFileExts.includes(path.extname(file.originalname).substring(1))) {
      cb(null, Date.now() + '_' + file.originalname);
    } else {
      cb(new Error('File not supported'), false);
    }
  }
})

const upload = multer({
  limits: { fileSize: allowedMaxFileSizeInBytes, files: 1 },
  preservePath: true,
  storage
});

router.get('/', async function (req, res, next) {
  const filename = req.query.file;
  res.download(`${__dirname}/../uploads/${filename}`)
})

router.post('/', upload.single('file'), async function (req, res, next) {
  const { uploaded_by, uploaded_for } = req.body;

  res.json(await create(req.file, uploaded_by, uploaded_for || uploaded_by));

});

module.exports = router;
