const {
  token: {
    logout,
    getToken,
    verifyToken,
  },
} = $require('helpers')
const {
  sendResponse,
  fail,
  success,
} = require('./response')
const Logger = $require('loaders/logger');

module.exports = async (req, res, next) => {
  const token = getToken(req);
  const clientVerifier = req.session.clientVerifier;
  try {
    if (!token && !clientVerifier) return next();
    req.currentUser = await verifyToken(token);
    if (!clientVerifier || req.currentUser.clientVerifier != clientVerifier) throw new Error();
    next();
  } catch (e) {
    Logger.error('🔥 token blocked!!');
    logout(req);
    return sendResponse(res)(fail.auth.tokenForbidden());
  }
}