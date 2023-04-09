const helper = require('../helper');
const config = require('../dbconfig');
const db = require('./db');
const emailsender = require("./Email");

async function getDoctors(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
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

  getEmail(userId, true);
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

  getEmail(userId, false);
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

async function getEmail(userId, bool) {
  try {
    const mail = await db.query(
      `SELECT name, email FROM user WHERE id="${userId}"`
    );

    const { name, email } = mail[0];

    try {
      // emailsender.sendEmail(name, email, bool);
    } catch (err) {
      console.error(`Error sending email`, err.message);
      next(err);
    }
  } catch (err) {
    console.error(`Error while getting email from user`, err.message);
    next(err);
  }
}


module.exports = {
  getDoctors,
  approveDoctor,
  rejectDoctor,
  getDoctor
}
