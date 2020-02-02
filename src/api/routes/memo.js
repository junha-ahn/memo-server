const router = require('express').Router();
const {
  container
} = $require('api/middlewares');

module.exports = app => {
  app.use('/memo', router);

  router.get(['/', '/:id'], container(async req => {

  }));

  router.post('/', container(async req => {

  }));

  router.put('/:id', container(async req => {

  }));

  router.delete('/:id', container(async req => {

  }));

  router.put('/fix/:id', container(async req => {

  }));
};