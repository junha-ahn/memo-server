const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');
const Logger = require('./logger')

module.exports = app => {
  mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');
  expressLoader(app);
  Logger.info('✌️ Express loaded');
}