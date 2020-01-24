const Response = (statusStep = 1) => (
  httpCode = 500,
  message = '서버 내부에 장애가 발생했습니다.',
  data = null,
) => {
  return {
    status: (statusStep === 0),
    httpCode,
    message,
    data,
  }
}

const Success = Response(0)
const InternalError = Response(1)
const Unauthorized = Response(2)
const BadRequest = Response(3)
const Unable = Response(4)

module.exports = {
  Success,
  InternalError,
  Unauthorized,
  BadRequest,
  Unable,
}