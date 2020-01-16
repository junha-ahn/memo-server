const {
  sendResponse,
  fail
} = require('./response');
const Logger = $require('loaders/logger');

module.exports = service => async (req, res) => {
  const response = sendResponse(res);
  try {
    const result = await service(req);
    response(result || fail.error.internalError({
      errorMessage: '반환값이 명시되지 않았습니다.'
    }));
  } catch (e) {
    Logger.error(e);
    if (e.response) {
      const error = e.response;
      const {
        status = 500, data = {}
      } = error;
      res.status(status).json(data);
    }
    response(fail.error.internalError({
      errorMessage: e.message || ''
    }));
  }
};;