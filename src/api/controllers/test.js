const {
  container,
  success,
  fail,
} = $require('api/middlewares');

exports.getTest = container(async req => {
  return success.crud.getItem({
    message: 'Hello World!'
  });
})