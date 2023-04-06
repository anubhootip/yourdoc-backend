const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');
const db = require('./db');
const helper = require('../helper');
const config = require('../dbconfig');

async function getRegistrationInfo(creds) {
  const { id } = creds;
  const result = await db.query(
    `select * from user inner join doctor on user.id = doctor.user_id where user.id = '${id}'`
  );

  if (!result) {
    throw new Error("User not found");
  }

  return { result }
}

async function fillRegisterInfo(creds) {
  const { name, dob, gender, phone, address, latlong, avatar_url, email, password, specialization, is_approved = 0 } = creds;
  const id = uuid();
  const type = 'doctor';
  let message = 'Error in creating doctor';
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
    const doctorResult = await db.query(
      `INSERT INTO doctor 
        (user_id, specialization, is_approved)
      VALUES ('${id}', '${specialization}', '${is_approved}');
      `
    );
    if (userResult.affectedRows && doctorResult.affectedRows) {
      message = 'Doctor added successfully!!';
    }
  }
  catch (e) {
    message += ': ' + e.message;
  }

  return { message, id, email }
}

module.exports = {
  getRegistrationInfo,
  fillRegisterInfo
}