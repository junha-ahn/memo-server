const Container = require('typedi').Container;
const router = require('express').Router();
const TagService = $require('services/tag');
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
  app.use('/tag', router);
  router.get(
    ['/', '/:_id'],
    isAuth,
    validator.mw([
      ...validator.presets.getterValidations,
    ]),
    container(async req => {
      const _id = req.params._id;
      const logger = Container.get('logger');
      logger.debug('Calling Get Tag endpoint with params: %o queries: %o', req.params, req.query);
      const tagServiceInstance = Container.get(TagService);
      return await resolveDB.get(_id)(tagServiceInstance.get(_id)(req.currentUser._id, req.query));
    })
  );
};