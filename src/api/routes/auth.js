const router = require('express').Router();
const AuthController = $require('api/controllers/auth');

module.exports = app => {
  app.use('/auth', router);
  
  router.get('/me', AuthController.me);

  router.post('/singin', AuthController.singin);

  router.post('/signup', AuthController.signup);
  
  router.post('/logout', AuthController.logout);

  router.get('/exists/username/:username', AuthController.existsUsername);
  
  router.delete('/account', AuthController.deleteAccount);
};