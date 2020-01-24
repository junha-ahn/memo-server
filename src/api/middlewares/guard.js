const {
  fail,
  sendResponse
} = require('./response');

const checkAuthorization = async (allows, req) => {
  if (!(allows && allows.length)) return null
  // 토큰 인증 관련 ... 추가 예정
  return result ?
    null :
    req.user ?
    fail.auth.forbidden() :
    fail.auth.unauthenticated()
}

const mw = allows => async (req, res, next) => {
  const result = await checkAuthorization(allows, req);
  if (!result) return next()
  return sendResponse(res)(result);
}

module.exports = {
  mw,
};