const getDBURL = (DB_NAME) => {
  if (process.env.DB_USER && process.env.DB_PWD) return `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}:${process.env.DB_HOST}/${process.env.DB_NAME}`
  
  return `mongodb://${process.env.DB_HOST}:${process.env.DB_HOST}/${DB_NAME}`
}

const configs = {
  production: {
    uri: getDBURL(process.env.DB_NAME),
  },
  development: {
    uri:  getDBURL(process.env.DB_NAME_DEV),
  },
  test: {
    uri:getDBURL(process.env.DB_NAME_TEST),
  },
};

module.exports = configs;
