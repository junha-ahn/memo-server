const router = require('express').Router();
const Container = require('typedi').Container;
const MemoService = $require('services/memo');
const {
  container,
  success,
  fail,
  validator,
  resolveDB,
  isAuth,
} = $require('api/middlewares');

module.exports = app => {
  app.use('/memo', router);

  router.get(['/', '/:id'], container(async req => {

  }));

  const setterValidator = [
    validator.body('isFixed').isIn([0, 1]),
    validator.body('title').isLength({
      min: 2
    }),
    validator.body('content').isLength({
      min: 2
    }),
    validator.body('tagIds').optional({
      nullable: true
    }).toArray().isArray(),
  ]
  router.post(
    '/',
    validator.mw([
      ...setterValidator,
    ]),
    container(async req => {
      const logger = Container.get('logger');
      logger.debug('Calling Create Memo endpoint with body: %o', req.body);
      const memoServiceInstance = Container.get(MemoService);
      return resolveDB.create(await memoServiceInstance.create(req.currentUser._id, req.body));
    }));

  router.put('/:_id',
    validator.mw([
      ...setterValidator,
    ]),
    container(async req => {
      const logger = Container.get('logger');
      logger.debug('Calling Put Memo endpoint with body: %o', req.body);
      const memoServiceInstance = Container.get(MemoService);
      return resolveDB.update(await memoServiceInstance.update(req.params._id, req.currentUser._id, req.body));
    }));

  router.delete('/:_id', container(async req => {
    const logger = Container.get('logger');
    logger.debug('Calling Delete Memo endpoint with body: %o', req.body);
    const memoServiceInstance = Container.get(MemoService);
    return resolveDB.delete(await memoServiceInstance.delete(req.params._id, req.currentUser._id));
  }));

  router.put('/fix/:_id', container(async req => {

  }));
};