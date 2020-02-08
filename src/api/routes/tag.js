const router = require('express').Router();
const Container = require('typedi').Container;
const TagService = $require('services/tag');
const {
  success,
  fail,
  validator,
  container,
  resolveDB,
  isAuth,
} = $require('api/middlewares');

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
      return resolveDB.get(_id)(await tagServiceInstance.get(_id)(req.currentUser._id, req.query));
    })
  );

  const setterValidator = [
    validator.body('name').isLength({
      min: 2
    }),
  ]

  router.post(
    '/',
    isAuth,
    validator.mw([
      ...setterValidator,
    ]),
    container(async req => {
      const logger = Container.get('logger');
      logger.debug('Calling Create Tag endpoint with body: %o', req.body);
      const tagServiceInstance = Container.get(TagService);
      return resolveDB.create(await tagServiceInstance.create(req.currentUser._id, req.body));
    })
  );
  router.put(
    '/:_id',
    isAuth,
    validator.mw([
      ...setterValidator,
    ]),
    container(async req => {
      const logger = Container.get('logger');
      logger.debug('Calling Update Tag endpoint with body: %o', req.body);
      const tagServiceInstance = Container.get(TagService);
      return resolveDB.update(await tagServiceInstance.update(req.params._id, req.currentUser._id, req.body));
    })
  );
  router.delete(
    '/:_id',
    isAuth,
    validator.mw([
      ...setterValidator,
    ]),
    container(async req => {
      const logger = Container.get('logger');
      logger.debug('Calling Delete Tag endpoint');
      const tagServiceInstance = Container.get(TagService);
      return resolveDB.delete(await tagServiceInstance.delete(req.params._id, req.currentUser._id));
    })
  );
};