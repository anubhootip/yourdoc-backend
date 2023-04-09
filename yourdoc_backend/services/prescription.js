const { v4: uuid } = require('uuid');
const db = require('./db');
const helper = require('../helper');
const config = require('../dbconfig');


async function getByPatientId(patientId) {
  const id = uuid();
  const rows = await db.query(
    `SELECT * FROM upload, user 
    WHERE uploaded_for=user.id and uploaded_for='${patientId}'`
  );
  const data = helper.emptyOrRows(rows);

  return { data }
}

module.exports = { getByPatientId }