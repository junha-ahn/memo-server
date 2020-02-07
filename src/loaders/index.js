const expressLoader = require("./express");
const mongooseLoader = require("./mongoose");
const Logger = require("./logger");
const dependencyInjectorLoader = require("./dependencyInjector");

module.exports = async app => {
  const mongoConnection = await mongooseLoader();
  Logger.info("✌️ DB loaded and connected!");

  const userModel = {
    name: "userModel",
    model: $require("models/user")
  };
  const memoModel = {
    name: "memoModel",
    model: $require("models/memo")
  };
  const tagModel = {
    name: "tagModel",
    model: $require("models/tag")
  };



  dependencyInjectorLoader({
    mongoConnection,
    models: [
      userModel,
      memoModel,
      tagModel,
    ]
  });
  Logger.info("✌️ Dependency Injector loaded");

  expressLoader(app);
  Logger.info("✌️ Express loaded");
};