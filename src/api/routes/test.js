const router = require("express").Router();
const {
  getTest
} = $require('api/controllers/test');

module.exports = app => {
  app.use('/', router);
  router.get("/", getTest);
};