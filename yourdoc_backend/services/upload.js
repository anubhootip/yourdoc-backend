const db = require('./db');
const helper = require('../helper');
const config = require('../dbconfig');
const { v4: uuid } = require('uuid');

const allowedFileExts = ["txt", "jpg", "jpeg", "png", "doc", "docx", "pdf"];
const allowedMaxFileSizeInBytes = 2 * 1024 * 1024; // 2MB

async function create(file, createdByUserId, createdForUserId) {
  const { filename, originalname, mimetype, size } = file;
  const id = uuid();

  const result = await db.query(
    `INSERT INTO upload
    (id, file_name, original_name, mime_type, size, uploaded_by, uploaded_for) 
    VALUES ('${id}','${filename}','${originalname}','${mimetype}',${size},'${createdByUserId}', '${createdForUserId}');
    `
  );

  let message = 'Error in uploading';

  if (result.affectedRows) {
    message = 'Uploaded successfully';
  }

  return { message, id };
}


module.exports = {
  allowedFileExts, allowedMaxFileSizeInBytes, create
}