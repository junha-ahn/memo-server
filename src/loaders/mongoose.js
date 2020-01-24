const mongoose = require('mongoose');
const config = $require('config');

module.exports = async () => {
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }
  mongoose.Promise = global.Promise;

  mongoose.connection.on('error', (err) => {
    console.log('mongodb connection error', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('mongodb connection is lost, trying to re-connect to mongodb.');
    // connect();
  });
  const connection = await mongoose.connect(config.dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  return connection.connection.db;
};