const db = require('./db');
const helper = require('../helper');
const config = require('../dbconfig');

async function getById() {
  const result = await db.query(
    `SELECT name, type, specialization, hospital_id
    FROM user inner join doctor on user.id = doctor.user_id and is_approved = 0`
  );

  if (!result) {
  throw new Error("User not found");
  }

  return {result}
}

async function adminInfo(creds){
  const {email, password} = creds;
  const userResult = await db.query(`SELECT * FROM user WHERE email='${email}'`);

  if (!userResult || userResult.length === 0) {
      throw new Error("User not found");
  }

  const passwordResult = await db.query(`SELECT * FROM user WHERE email='${email}' AND password='${password}'`);
  if(!passwordResult || passwordResult.length === 0){
      throw new Error("Password Not Matched");
  }

  return {result: userResult, result1: undefined};
}


module.exports = {
    getById,
    adminInfo
  }