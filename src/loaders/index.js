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

  dependencyInjectorLoader({
    mongoConnection,
    models: [
      userModel
      // salaryModel,
      // whateverModel
    ]
  });
  Logger.info("✌️ Dependency Injector loaded");

  expressLoader(app);
  Logger.info("✌️ Express loaded");
};