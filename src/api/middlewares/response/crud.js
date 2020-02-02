module.exports = (Response) => {
  const {
    Success,
    Unauthorized,
    BadRequest,
    Unable,
  } = Response;

  const success = {}
  const fail = {}

  fail.notFound = () => Unable(
    404,
    '해당 항목이 없습니다.'
  )

  success.getItem = singleEntity => Success(
    200,
    '항목 조회에 성공했습니다.',
    singleEntity,
  )

  success.getItems = (results, count) => Success(
    200,
    '목록을 조회했습니다.', {
      results,
      count
    },
  )

  success.createItem = (data = {}) => Success(
    201,
    '항목을 추가했습니다', {
      ...data
    },
  )

  success.updateItem = () => Success(
    201,
    '항목을 업데이트했습니다.'
  )

  success.deleteItem = () => Success(
    200,
    '항목을 제거했습니다',
  )

  return {
    success,
    fail,
  }
}