const mysql = require('mysql2/promise');
const config = require('../dbconfig');

async function query(sql, params) {
    const connection = await mysql.createConnection(config.db);
    const [results] = await connection.execute(sql, params);
    connection.destroy();

    return results;
}

async function poolExecute(sqlQueries) {
    const pool = mysql.createPool(config.db);
    const results = [];
    for (const query of sqlQueries) {
        const [result] = await pool.query(query);
        results.push(result);
    }
    return results;
}

module.exports = {
    query,
    poolExecute
}