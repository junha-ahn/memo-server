const _ = require('lodash')

const Response = require('./Response')
const auth = require('./auth')(Response)
const crud = require('./crud')(Response)
const error = require('./error')(Response)

const sendResponse = res => (result = {}) => (
  res.status(result.httpCode || 500).send({
    status: result.status || false,
    message: result.message || '서버 내부에 장애가 발생했습니다.',
    data: result.data,
  }))

const {
  success,
  fail
} = _.reduce(_.toPairs({
  auth,
  crud,
  error,
}), (acc, curr) => {
  const name = curr[0];
  const value = curr[1];

  acc.success[name] = value.success || {};
  acc.fail[name] = value.fail || {};
  return acc;
}, {
  success: {},
  fail: {}
})

module.exports = {
  sendResponse,
  success,
  fail,
};