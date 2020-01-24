const {
  success,
  fail,
} = $require('api/middlewares');

exports.getTest = async req => {
  return success.crud.getItem({
    message: 'Hello World!'
  });
}