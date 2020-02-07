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
    describe('성공시', () => {});
    describe('실패시', () => {});
  })
  describe('/POST /memo는', () => {
    describe('성공시', () => {});
    describe('실패시', () => {});
  })
  describe('/PUT /memo/:_id는', () => {
    describe('성공시', () => {});
    describe('실패시', () => {});
  })
  describe('/DELETE /memo/:_id는', () => {
    describe('성공시', () => {});
    describe('실패시', () => {});
  })
  describe('/PUT /memo/fix/:_id는', () => {
    describe('성공시', () => {});
    describe('실패시', () => {});
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