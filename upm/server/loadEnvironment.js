require('dotenv').config({path:`${__dirname}/../../.env`});

const SERVER_PORT = process.env.SERVER_PORT || 5000;

const mysqlDbName = process.env.MY_SQL_DB_NAME || '';
const mysqlCreds = {
    port    : process.env.MY_SQL_PORT || 3306,
    host    : process.env.MY_SQL_HOST || 'localhost',
    user    : process.env.MY_SQL_USER || 'root',
    password: process.env.MY_SQL_PWD  || ''
};

module.exports = {
    SERVER_PORT,
    mysqlDbName,
    mysqlCreds
};
