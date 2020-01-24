module.exports = (Response) => {
  const {
    Success,
    Unauthorized,
    BadRequest,
    Unable,
  } = Response;

  const success = {}
  const fail = {}

  success.logout = () => Success(
    200, 10,
    '로그아웃에 성공했습니다.'
  )

  success.login = (token, info) => Success(
    200, 10,
    '로그인에 성공했습니다.', {
      token,
      info
    },
  )

  fail.login = () => BadRequest(
    400, 90,
    '아이디, 비밀번호를 다시 입력해주세요.',
  )
  fail.password = () => BadRequest( // 이메일 인증번호
    400, 90,
    '패스워드를 다시 입력해주세요.',
  )

  success.authentication = (token, data) => Success(
    200, 30,
    '로그인 상태 확인에 성공했습니다.', {
      token,
      data
    }
  )

  success.register = () => Success(
    201, 40,
    '회원가입에 성공했습니다.',
  )

  fail.unauthenticated = () => Unauthorized(
    401, 11,
    '비회원 상태입니다.',
  )

  fail.forbidden = (current, required) => Unauthorized(
    403, 20,
    '권한이 부족합니다.',
  )
  fail.tokenForbidden = () => Unauthorized(
    403, 13,
    '토큰 인증 실패.',
  )

  success.sendMail = () => Success(
    200, 10,
    '메일 발송을 성공했습니다.',
  )
  return {
    success,
    fail,
  }
}