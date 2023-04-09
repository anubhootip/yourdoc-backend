const db = require('./db');
const helper = require('../helper');
const config = require('../dbconfig');
const { v4: uuid } = require('uuid');

async function getByDoctorId(doctorId, page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT u.name as patient_name, aId, specialization, appointmentDateTime, description, pAppoint.name as doctor_name, patient_id, gender, phone, email
    FROM (SELECT a.id as aId, specialization, datetime appointmentDateTime, description, name, patient_id FROM
      appointment a, doctor d, user u
      WHERE a.doctor_id = d.user_id and d.user_id = '${doctorId}' and u.id=d.user_id) pAppoint, user u
    WHERE u.id = pAppoint.patient_id
      LIMIT ${offset},${config.listPerPage};
    `
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return { data, meta }
}

async function getByPatientId(patientId, page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT aId, name, doctor_id, datetime, description, specialization
    FROM (SELECT datetime, description, doctor_id, a.id as aId
      FROM appointment a, user u
      WHERE a.patient_id = u.id and u.id = '${patientId}') pAppoint, user uu, doctor d
    WHERE uu.id = pAppoint.doctor_id and d.user_id=uu.id
    ORDER BY datetime
    LIMIT ${offset},${config.listPerPage}
    `
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return { data, meta }
}

async function create(appointment) {
  const { patient_id, doctor_id, datetime, description } = appointment;
  const id = uuid();

  const result = await db.query(
    `INSERT INTO appointment
    (id, patient_id, doctor_id, datetime, description)
    VALUES
      ('${id}', '${patient_id}', '${doctor_id}', '${datetime}', '${description ? description : ''}');
    `
  );

  let message = 'Error in creating appointment';

  if (result.affectedRows) {
    message = 'Appointment created successfully';
  }

  return { message, id };
}

async function deleteA(appointmentId) {
  const result = await db.query(
    `DELETE FROM appointment
    WHERE id='${appointmentId}'
    `
  );

  let message = 'Error in deleting appointment';

  if (result.affectedRows) {
    message = 'Appointment deleted successfully';
  }

  return { message };
}

module.exports = {
  getByDoctorId,
  getByPatientId,
  create,
  deleteA
}