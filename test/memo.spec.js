const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/app');
const Memo = $require('models/memo');
const expect = chai.expect;

chai.use(chaiHttp);

const tester = {
  email: 'email@email.com',
  password: '1234',
  name: '테스트'
}
describe('Memo', () => {
  before(async () => {
    await chai.request(server).post('/api/auth/sign-up').send(tester)
  })
  beforeEach(async () => { //Before test we empty the database
    await Memo.deleteMany();
  });
  describe('/GET /momo는', () => {
    // validator 관련 
    // TAG 관련... RESPONSE 존재...
    // TAG 관련... ID 검색 가능
    describe('성공시', () => {});
    describe('실패시', () => {});
  })
  describe('/POST /memo는', () => {
    describe('성공시', () => {
      it('201을 리턴한다, 생성한 객체를 반환한다', async () => {
        const res = await chai.request(server).post('/api/memo').send({
          isFixed: 1,
          tags: ['개인', '맛집'],
          title: '대한민국 맛집 TOP 10',
          content: '...내용',
        })
        expect(res).to.have.status(201);
        expect(res.body.status).to.deep.equal(true);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('_id');
      });
    });
    describe('실패시', () => {
      it('isFixed 값 오류시, validator 오류를 반환한다', async () => {});
      it('title을 전송하지 않을 경우, validator 오류를 반환한다', async () => {});
    });
  })
  describe('/PUT /memo/:_id는', () => {
    describe('성공시', () => {
      it('200 반환', async () => {});
    });
    describe('실패시', () => {
      it('존재하지 않는 메모를 찾을 경우, 400 반환', async () => {});
    });
  })
  describe('/DELETE /memo/:_id는', () => {
    describe('성공시', () => {
      it('200 반환', async () => {});
    });
    describe('실패시', () => {
      it('존재하지 않는 메모를 찾을 경우, 400 반환', async () => {});
    });
  })
  describe('/PUT /memo/fix/:_id는', () => {
    describe('성공시', () => {
      it('200 반환', async () => {});
    });
    describe('실패시', () => {
      it('이미 해당 상태일 경우, 409 반환', async () => {});
    });
  })
});

function loginUser(auth) {
  return done => {
    chai.request(server)
      .post('/api/auth/sign-in')
      .send(tester)
      .end((err, res) => {
        auth.token = res.body.data.token
        auth.cookies = res.headers['set-cookie'].pop().split(';')[0];
        done();
      })
  }
}