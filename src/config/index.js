require("dotenv").config();
const path = require('path');
global.$require = pathname => require(path.join(__dirname, '../' + pathname))

const normalizePort = val => {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}
const getDBURL = ({
  DB_USER,
  DB_PWD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
}) => DB_USER && DB_PWD ? `mongodb://${DB_USER}:${DB_PWD}@${DB_HOST}:${DB_PORT}/${DB_NAME}` : `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

module.exports = {
  port: normalizePort(process.argv[2] || process.env.PORT || 3000),
  dbURL: getDBURL(process.env),
  api: {
    prefix: '/api',
  },
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
}