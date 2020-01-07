const router = require("express").Router();

module.exports = app => {
  app.use('/auth', router)
  router.get("/test", (req, res) => {
    return res.status(200).json({
      message: 'Hello World!'
    })
  });
};