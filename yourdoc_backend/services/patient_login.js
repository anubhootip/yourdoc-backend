const db = require('./db');
const helper = require('../helper');
const config = require('../dbconfig');
const bcrypt = require('bcrypt');

async function getById(creds) {
  const { email } = creds;
  const result = await db.query(
    `SELECT name, type, email, password, dob, address, latlong, blood_group
    FROM user inner join patient on user.id = patient.user_id where user.email='${email}'`
  );
  let message = 'User not found!';

  if (result && result.length > 0) {
    message = 'User found successfully';
  }
  return { result, message }
}

async function patientInfo(creds) {
  const { email, password } = creds;
  const rows = await db.query(
    `SELECT * FROM user u, patient p where u.id=p.user_id and u.email='${email}'`
  );
  const [data] = helper.emptyOrRows(rows);

  if (data) {
    const isPasswordCorrect = await bcrypt.compare(password, data.password);
    if (isPasswordCorrect) {
      return { data, message: 'success' };
    }
  }

  return { message: 'Wrong email/password' }

}

module.exports = {
  getById,
  patientInfo
}