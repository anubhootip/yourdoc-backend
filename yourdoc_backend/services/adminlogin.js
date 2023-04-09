const bcrypt = require('bcryptjs');
const db = require('./db');
const helper = require('../helper');
const { v4: uuid } = require('uuid');

async function getById() {
  const result = await db.query(
    `SELECT name, type, specialization, hospital_id
    FROM user inner join doctor on user.id = doctor.user_id and is_approved = 0`
  );

  if (!result) {
    throw new Error("User not found");
  }

  return { result }
}

async function adminInfo(creds) {
  const { email, password } = creds;
  const rows = await db.query(
    `SELECT * FROM user where email='${email}' and type='admin'`
  );
  const [data] = helper.emptyOrRows(rows);

  if (data) {
    const isPasswordCorrect = await bcrypt.compare(password, data.password);
    if (isPasswordCorrect) {
      return { data, message: 'success' };
    }
  }
  return { message: 'Wrong email or password!!' }

}

async function adminRegister(creds) {
  const { name, dob, gender, phone, address, latlong, avatar_url, email, password } = creds;
  const id = uuid();
  const type = 'admin';
  let message = 'Error in creating admin';
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
    if (userResult.affectedRows) {
      message = 'Admin registered successfully!!';
    }
  }
  catch (e) {
    message += ': ' + e.message;
  }

  return { message, id, email }
}


module.exports = { getById, adminInfo, adminRegister }