const db = require('./db');
const helper = require('../helper');
const config = require('../dbconfig');
const { v4: uuid } = require('uuid');

async function getMultiple(page = 1) {
  const offset = helper.getOffset(config.listPerPage, page);
  const rows = await db.query(
    `SELECT name, email FROM user LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return { data, meta }
}

async function getById(userId) {
  const rows = await db.query(
    `SELECT name, email FROM user where id=${userId}`
  );
  const [data] = helper.emptyOrRows(rows);

  return {
    data: data || null
  }
}

async function getByIdNType(userId, type) {
  const userTypeQueryMap = {
    "patient": `select * from user u, patient p where u.id=p.user_id and u.id='${userId}'`,
    "doctor": `select * from user u, doctor d where u.id=d.user_id and u.id='${userId}'`,
    "admin": `select * from user where u.id='${userId}'`,
  }
  const rows = await db.query(userTypeQueryMap[type.toLowerCase()]);
  const [data] = helper.emptyOrRows(rows);

  if (data === undefined) {
    return {
      data: null
    };
  }

  return {
    data
  }
}

async function create(user) {
  const { email, password, name, type, phone, dob, gender, address, latlong, avatar_url } = user;
  const id = uuid();

  const result = await db.query(
    `INSERT INTO user
      (id, email, password, name, type, phone, dob, gender, address, latlong, avatar_url)
    VALUES
      (${id}, ${email}, ${password}, ${name}, ${type}, ${phone}, ${dob}, ${gender}, ${address}, ${latlong}, ${avatar_url});
    `
  );

  let message = 'Error in creating user';

  if (result.affectedRows) {
    message = 'User created successfully';
  }

  return { message, id };
}

module.exports = {
  getById,
  getMultiple,
  getByIdNType,
  create
}
