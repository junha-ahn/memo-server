const router = require("express").Router();
const {
  getTest
} = $require('api/controllers/test');
const {
  container
} = $require('api/middlewares');

module.exports = app => {
  app.use('/', router);
  router.get("/", container(getTest));
};