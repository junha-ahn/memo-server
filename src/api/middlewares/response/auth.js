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
    200,
    '로그아웃에 성공했습니다.'
  )

  success.login = (token, info) => Success(
    200,
    '로그인에 성공했습니다.', {
      token,
      info
    },
  )

  fail.login = () => BadRequest(
    400,
    '아이디, 비밀번호를 다시 입력해주세요.',
  )
  fail.password = () => BadRequest( // 이메일 인증번호
    400,
    '패스워드를 다시 입력해주세요.',
  )

  success.authentication = (token, info) => Success(
    200,
    '로그인 상태 확인에 성공했습니다.', {
      token,
      info
    }
  )

  success.register = () => Success(
    201,
    '회원가입에 성공했습니다.',
  )

  fail.unauthenticated = () => Unauthorized(
    401,
    '비회원 상태입니다.',
  )

  fail.forbidden = (current, required) => Unauthorized(
    403,
    '권한이 부족합니다.',
  )
  fail.tokenForbidden = () => Unauthorized(
    403,
    '토큰 인증 실패.',
  )

  success.sendMail = () => Success(
    200,
    '메일 발송을 성공했습니다.',
  )
  return {
    success,
    fail,
  }
}