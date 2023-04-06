const db = require('./db');
const helper = require('../helper');
const config = require('../dbconfig');
const { v4: uuid } = require('uuid');

async function search(q) {
  const query = `SELECT * FROM doctor,user 
  WHERE id=user_id AND is_approved = 1 
    AND (specialization like '${q}%' OR name like '${q}%' OR email like '${q}%' OR address like '%${q}%' )`;
  const rows = await db.query(query);
  const data = helper.emptyOrRows(rows);

  return { data }
}

async function searchDocBySpec(spec) {
  const result = await db.query(
    `SELECT * FROM doctor WHERE specialization = '${spec}' and is_approved = 1`
  );
  console.log(result);
  return {
    result
  }
}

async function searchDocByName(docName) {
  const rows = await db.query(
    `SELECT * FROM user,doctor WHERE id=user_id and name like '${docName}' and is_approved = 1`
  );
  const [data] = helper.emptyOrRows(rows);
  return { data }
}

async function searchDocByPinCode(pinCode) {
  const result = await db.query(
    `SELECT * FROM doctor INNER JOIN user ON address = '${pinCode}' and is_approved = 1;`
  );
  console.log(result);
  return {
    result
  }
}

module.exports = {
  search,
  searchName: searchDocByName,
  getDocSpec: searchDocBySpec,
  searchPinCode: searchDocByPinCode
}