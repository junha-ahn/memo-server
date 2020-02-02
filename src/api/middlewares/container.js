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
    console.error(e);
    if (e.response) {
      const error = e.response;
      const {
        httpCode = 500, data = {}
      } = error;
      res.status(httpCode).json(data);
    }
    response(fail.error.internalError({
      errorMessage: e.message || ''
    }));
  }
};;