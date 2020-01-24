const router = require('express').Router();
const AuthController = $require('api/controllers/auth');
const {
  container
} = $require('api/middlewares');

module.exports = app => {
  app.use('/auth', router);

  router.get('/me', container(AuthController.me));

  router.post('/signin', container(AuthController.signin));

  router.post('/signup', container(AuthController.signup));

  router.post('/logout', container(AuthController.logout));

  router.get('/exists/username/:username', container(AuthController.existsUsername));

  router.delete('/account', container(AuthController.deleteAccount));
};