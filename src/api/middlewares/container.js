const config = $require('config')
const {
  sendResponse,
  fail
} = require('./response');


module.exports = service => async (req, res) => {
  const response = sendResponse(res);
  try {
    const result = await service(req);
    response(result || fail.error.internalError({
      errorMessage: '반환값이 명시되지 않았습니다.'
    }));
  } catch (e) {
    if (config.NODE_ENV === 'development') console.error(e)
    if (e.status !== undefined) {
      const httpCode = e.httpCode || 500;
      return res.status(httpCode).json(e);
    }
    response(fail.error.internalError({
      errorMessage: e.message || ''
    }));
  }
};;