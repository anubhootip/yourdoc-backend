const helper = require('../helper');
const db = require('./db');

async function getDoctors(page = 1) {
  const rows = await db.query(
    'SELECT id, email, name, phone, dob, gender, address, latlong FROM user INNER JOIN doctor ON user.id = doctor.user_id WHERE doctor.is_approved = false;'
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}


async function getDoctor(userId) {
  const row = await db.query(
    `SELECT id, email, name, phone, dob, gender, address, latlong, specialization FROM user INNER JOIN doctor ON user.id = doctor.user_id WHERE doctor.user_id = "${userId}"`
  );
  const [data] = helper.emptyOrRows(row);

  return {
    data
  }
}


async function approveDoctor(userId) {

  const update = await db.query(
    `UPDATE doctor SET is_approved = true WHERE user_id="${userId}"`
  );

  let message = 'Error in Updating Doctor';

  if (update.affectedRows) {
    message = 'Doctor Registeration Sucessfull!';
  }
  const data = helper.emptyOrRows(update);

  return {
    message, data
  };
}

async function rejectDoctor(userId) {
  const update = await db.query(
    `DELETE FROM doctor WHERE user_id="${userId}"`
  );

  let message = 'Error in Removing Doctor';

  if (update.affectedRows) {
    message = 'Doctor Rejected Sucessfull!';
  }
  const data = helper.emptyOrRows(update);

  return {
    message, data
  };
}


module.exports = {
  getDoctors,
  getDoctor,
  approveDoctor,
  rejectDoctor
}
