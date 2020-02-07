require("dotenv").config();
const path = require("path");
global.$require = pathname => require(path.join(__dirname, "../" + pathname));

const normalizePort = val => {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};
const getDBURL = ({
  NODE_ENV,
  DB_USER,
  DB_PWD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  TEST_DB_NAME = 'test',
}) => {
  const DBName = NODE_ENV === 'test' ? TEST_DB_NAME : DB_NAME;
  return DB_USER && DB_PWD ?
    `mongodb://${DB_USER}:${DB_PWD}@${DB_HOST}:${DB_PORT}/${DBName}` :
    `mongodb://${DB_HOST}:${DB_PORT}/${DBName}`;
}
module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  port: normalizePort(process.argv[2] || process.env.PORT || 3000),
  dbURL: getDBURL(process.env),
  redis: {
    enable: process.env.REDIS_ENABLE,
    host: process.env.REDIS_HOST,
    post: process.env.REDIS_PORT,
  },
  api: {
    prefix: "/api"
  },
  logs: {
    level: process.env.LOG_LEVEL || "silly"
  },
  SECRET_KEY: process.env.SECRET_KEY,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
};