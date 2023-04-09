const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
const config = {
    db: {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE,
    },
    listPerPage: 10
};
module.exports = config;