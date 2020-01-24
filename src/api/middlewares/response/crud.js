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
    404, 10,
    '해당 항목이 없습니다.'
  )

  success.getItem = singleEntity => Success(
    200, 30,
    '항목 조회에 성공했습니다.',
    singleEntity,
  )

  success.getItems = (results, count) => Success(
    200, 35,
    '목록을 조회했습니다.', {
      results,
      count
    },
  )

  success.createItem = (id, data = {}) => Success(
    201, 40,
    '항목을 추가했습니다', {
      id,
      ...data
    },
  )

  success.updateItem = () => Success(
    201, 50,
    '항목을 업데이트했습니다.'
  )

  success.deleteItem = () => Success(
    200, 60,
    '항목을 제거했습니다',
  )

  return {
    success,
    fail,
  }
}