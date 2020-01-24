module.exports = (Response) => {
  const {
    InternalError,
    Unauthorized,
    BadRequest,
    Unable,
  } = Response;

  const fail = {}

  fail.URLNotFound = url => InternalError(
    400, 1,
    '알 수 없는 요청입니다.', {
      url
    }
  )

  fail.internalError = errStack => console.error(errStack) || InternalError(
    500, 10,
    '서비스 장애입니다.',
    errStack,
  )

  fail.notFoundContent = () => Unable(
    404, 10,
    '해당 항목이 없습니다.',
  )

  fail.forbidden = (msg, data) => Unable(
    403, 20,
    msg || '정책상 불가능 합니다.',
    data,
  )

  fail.BadRequest = (msg, data) => BadRequest(
    400, 0,
    msg || '요청사항 처리에 실패했습니다.',
    data,
  )

  fail.invalid = data => BadRequest(
    422, 10,
    '올바른 형식의 요청이 아닙니다.',
    data
  )

  fail.conflict = data => BadRequest(
    409, 0,
    '요청이 현재 서버 상태와 충돌됩니다.',
    data
  )

  return {
    fail,
  }
}