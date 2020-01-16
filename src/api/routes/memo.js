const router = require('express').Router();
const memeController = $require('api/controllers/memo');

module.exports = app => {
  app.use('/memo', router);

  router.get(['/', '/:id'], memeController.get);

  router.post('/', memeController.create);

  router.update('/:id', memeController.update);

  router.delete('/:id', memeController.delete);

  router.update('/fix/:id', memeController.fix);
};