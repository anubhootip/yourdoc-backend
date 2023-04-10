const db = require('./db');
const { v4: uuid } = require('uuid');

const allowedFileExts = ["txt", "jpg", "jpeg", "png", "doc", "docx", "pdf"];
const allowedMaxFileSizeInBytes = 2 * 1024 * 1024; // 2MB

async function create(file_url, file_path, createdByUserId, createdForUserId) {

  const id = uuid();

  const result = await db.query(
    `INSERT INTO upload (id, file_path, file_url, uploaded_by, uploaded_for) VALUES ('${id}','${file_path}','${file_url}','${createdByUserId}', '${createdForUserId}');`);

  let message = 'Error in uploading';

  if (result.affectedRows) {
    message = 'Uploaded successfully';
  }

  return { message, id };
}


module.exports = {
  allowedFileExts, allowedMaxFileSizeInBytes, create
}