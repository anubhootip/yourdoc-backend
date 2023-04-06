const db = require('./db');
const helper = require('../helper');
const dbconfig = require('../dbconfig');
const { v4: uuid } = require('uuid');

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, dbconfig.listPerPage);
  const rows = await db.query(
    `SELECT name, specialization
    FROM doctor,user LIMIT ${offset},${dbconfig.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}

async function getById(doctorId) {
  const rows = await db.query(
    `SELECT name, specialization
    FROM doctor,user where id='${doctorId}'`
  );
  const [data] = helper.emptyOrRows(rows);

  return {
    data
  }
}

async function create(doctor) {
  const { email, password, name, type, phone, dob, gender, address, latlong, avatar_url, specialization, is_approved } = doctor;
  const id = uuid();
  const hospital_id = 1;

  const result = await db.query(
    `INSERT INTO user
      (id, email, password, name, type, phone, dob, gender, address, latlong, avatar_url)
    VALUES
      (${id}, ${email}, ${password}, ${name}, ${type}, ${phone}, ${dob}, ${gender}, ${address}, ${latlong}, ${avatar_url});
    INSERT INTO doctor
      (user_id, specialization, is_approved, hospital_id)
    VALUES
      (${id}, ${specialization}, ${is_approved}, ${hospital_id})`
  );

  let message = 'Error in creating doctor';

  if (result.affectedRows) {
    message = 'Doctor added successfully';
  }

  return { message, id };
}

module.exports = {
  getById,
  getMultiple,
  create
}