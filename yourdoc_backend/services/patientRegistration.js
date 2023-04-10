const db = require('./db');
const helper = require('../helper');
const config = require('../dbconfig');
const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');

async function getRegistrationInfo(creds) {
  const { id } = creds;
  const result = await db.query(
    `select * from user inner join patient on user.id = patient.user_id where user.id = '${id}'`
  );

  if (!result || result.result.rows.length == 0) {
    throw new Error("User not found");
  }

  return { result }
}

async function createUserPatient(creds) {
  let message = 'Error in creating patient';
  const { name, dob, gender, phone, address, latlong, avatar_url, email, password, blood_group } = creds;
  const type = 'patient';
  const id = uuid();
  const hashedPassword = await bcrypt.hash(password, 7);

  try {
    const userResult = await db.query(
      `
      INSERT INTO user
        (id, email, password, name, type, phone, dob, gender, address, latlong, avatar_url)
       VALUES ('${id}','${email}','${hashedPassword}','${name}','${type}',
       ${phone ? `'${phone}'` : null},${dob ? `'${dob}'` : null},
       ${gender ? `'${gender}'` : null},${address ? `'${address}'` : null},
       ${latlong ? `'${latlong}'` : null},${avatar_url ? `'${avatar_url}'` : null});
      `
    );
    const patientResult = await db.query(
      `INSERT INTO patient 
      (user_id, blood_group)
     VALUES ('${id}','${blood_group}');
     `
    );
    if (userResult.affectedRows && patientResult.affectedRows) {
      message = 'Patient added successfully';
    }
  } catch (e) {
    message += ': ' + e.message;
  }

  return { message, id, email };
}

module.exports = {
  getRegistrationInfo,
  createUserPatient
}