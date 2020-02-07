const Container = require('typedi').Container;
const router = require('express').Router();
const AuthService = $require('services/auth');
const {
  success,
  fail,
  validator,
  container,
  resolveDB,
  isAuth,
} = $require('api/middlewares');
const {
  token: {
    logout,
    getToken
  }
} = $require('helpers');

module.exports = app => {
  app.use('/auth', router);

  router.get(
    '/me',
    isAuth,
    container(async req => {
      // TOKEN RETURN => DB 조회 변경
      return success.auth.authentication(getToken(req), req.currentUser);
    })
  );

  router.post(
    '/sign-in',
    validator.mw([validator.presets.email, validator.presets.password]),
    container(async req => {
      const {
        email,
        password
      } = req.body;
      const logger = Container.get('logger');
      logger.debug('Calling Sign-In endpoint with body: %o', req.body);
      const authServiceInstance = Container.get(AuthService);
      const {
        token,
        user,
        clientVerifier
      } = await authServiceInstance.SignIn(
        email,
        password
      );
      req.session.clientVerifier = clientVerifier;
      return success.auth.login(token, user);
    })
  );

  router.post(
    '/sign-up',
    validator.mw([
      validator.presets.email,
      validator.presets.password,
      validator.presets.name,
    ]),
    // 이메일 인증 메일 관련 구현
    container(async req => {
      const {
        email,
        password,
        name,
      } = req.body;
      const logger = Container.get('logger');
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
      const authServiceInstance = Container.get(AuthService);
      const userRecord = await authServiceInstance.FindEmail(email);
      if (userRecord) return fail.error.conflict('이미 사용중인 이메일입니다.');
      return resolveDB.create(await authServiceInstance.SignUp({
        email,
        password,
        name,
      }));
    })
  );

  router.post(
    '/logout',
    container(async req => {
      logout(req);
      return success.auth.logout();
    })
  );
  router.get(
    '/exists/email/:email',
    validator.mw([
      validator.param('email').isEmail(),
    ]),
    container(async req => {
      const email = req.params.email;
      const logger = Container.get('logger');
      logger.debug('Calling Exists-Email endpoint with params: %o', req.params);
      const authServiceInstance = Container.get(AuthService);
      const userRecord = await authServiceInstance.FindEmail(email);
      if (userRecord) return success.crud.getItem();
      return fail.crud.notFound();
    })
  );

  router.delete(
    '/account',
    validator.mw([validator.presets.password]),
    container(async req => {
      const password = req.body.password;
      const logger = Container.get('logger');
      logger.debug('Calling (delete) Account endpoint with body: %o', req.body);
      const authServiceInstance = Container.get(AuthService);
      return resolveDB.delete(
        await authServiceInstance.deleteUser(req.currentUser._id, password)
      );
    })
  );
};