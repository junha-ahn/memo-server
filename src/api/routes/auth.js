const Container = require("typedi").Container;
const router = require('express').Router();
const AuthService = $require('services/auth');
const {
  success,
  fail,
  container,
  resolveDB,
} = $require('api/middlewares');
const {
  token: {
    logout,
    getToken,
  }
} = $require('helpers');

module.exports = app => {
  app.use('/auth', router);

  router.get('/me', container(async req => {
    return success.auth.authentication(getToken(req), req.currentUser);
  }));

  router.post('/signin',
    container(async req => {
      const {
        email,
        password
      } = req.body;
      const logger = Container.get('logger');
      logger.debug('Calling Sign-In endpoint with body: %o', req.body)
      const authServiceInstance = Container.get(AuthService);
      const {
        token,
        user,
        clientVerifier,
      } = await authServiceInstance.SignIn(email, password);
      req.session.clientVerifier = clientVerifier;
      return success.auth.login(token, user)

    }));

  router.post('/signup',
    // email 중복 체크 검사
    // 이메일 인증 메일 관련 구현
    container(async req => {
      const logger = Container.get('logger');
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body)
      const authServiceInstance = Container.get(AuthService);
      const userRecord = await authServiceInstance.SignUp(req.body);
      return resolveDB.create(userRecord)
    }));

  router.post('/logout',
    container(async req => {
      logout(req);
      return success.auth.logout();
    }));

  router.get('/exists/email/:email',
    container(async req => {
      const email = req.params.email;
      const logger = Container.get('logger');
      logger.debug('Calling Exists-Email endpoint with params: %o', req.params)
      const authServiceInstance = Container.get(AuthService);
      const userRecord = await authServiceInstance.FindEmail(email);
      if (userRecord) return success.crud.getItem();
      return fail.crud.notFound();
    }));

  router.delete('/account',
    container(async req => {

    }));
};