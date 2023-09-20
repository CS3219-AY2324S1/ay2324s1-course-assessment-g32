require('dotenv').config({path:`${__dirname}/../.env`});

const WEB_PORT = process.env.WEB_PORT || 3000;
const SERVER_PORT = process.env.SERVER_PORT || 5000;

const MONGO_CLIENT = process.env.ATLAS_URI || '';

const mysqlPort = process.env.MY_SQL_PORT || 3306;
const mysqlHost = process.env.MY_SQL_HOST || 'localhost';
const mysqlUser = process.env.MY_SQL_USER || 'root';
const mysqlPassword = process.env.MY_SQL_PWD || '';
const mysqlDbName = process.env.MY_SQL_DB_NAME || '';
const mysqlCreds = {
    port: mysqlPort,
    host: mysqlHost,
    user: mysqlUser,
    password: mysqlPassword
};

module.exports = {
    WEB_PORT,
    SERVER_PORT,
    MONGO_CLIENT,
    mysqlCreds,
    mysqlDbName
};
