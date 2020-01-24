const router = require('express').Router();
const memeController = $require('api/controllers/memo');
const {
  container
} = $require('api/middlewares');

module.exports = app => {
  app.use('/memo', router);

  router.get(['/', '/:id'], container(memeController.get));

  router.post('/', container(memeController.create));

  router.put('/:id', container(memeController.update));

  router.delete('/:id', container(memeController.delete));

  router.put('/fix/:id', container(memeController.fix));
};