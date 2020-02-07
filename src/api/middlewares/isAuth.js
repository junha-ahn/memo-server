const {
  fail,
  sendResponse
} = require('./response');

module.exports = (req, res, next) => req.currentUser ? next() : sendResponse(res)(fail.auth.unauthenticated());