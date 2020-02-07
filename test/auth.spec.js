const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/app');
const User = $require('models/user');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Auth', () => {
  before((done) => { //Before test we empty the database
    User.deleteMany({}, (err) => {
      done();
    });
  });
  describe('/POST sign-up는', () => {
    describe('성공시', () => {
      it('201을 리턴한다, 생성한 객체를 리턴한다', (done) => {
        chai.request(server)
          .post('/api/auth/sign-up')
          .send({
            email: 'email@email.com',
            password: '1234',
            name: '테스트'
          })
          .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body.status).to.deep.equal(true);
            expect(res.body.data).to.be.an('object');
            expect(res.body.data).to.have.property('_id');
            done();
          });
      });

    })
    describe('실패시', () => {
      it('이메일 없이 전송시 422를 리턴한다', (done) => {
        chai.request(server)
          .post('/api/auth/sign-up')
          .send({
            password: '1234',
            name: '테스트'
          })
          .end((err, res) => {
            expect(res).to.have.status(422);
            expect(res.body.status).to.deep.equal(false);
            expect(res.body.data).to.be.an('array');
            done();
          });
      });
      it('중복된 이메일을 전송시 409를 리턴한다', (done) => {
        chai.request(server)
          .post('/api/auth/sign-up')
          .send({
            email: 'email@email.com',
            password: '1234',
            name: '테스트'
          })
          .end((err, res) => {
            expect(res).to.have.status(409);
            expect(res.body.status).to.deep.equal(false);
            done();
          });
      });
    })
  })
  describe('/POST sign-in은', () => {
    describe('성공시', () => {
      it('토큰을 반환한다', done => {
        chai.request(server)
          .post('/api/auth/sign-in')
          .send({
            email: 'email@email.com',
            password: '1234',
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.status).to.deep.equal(true);
            expect(res.body.data).to.be.an('object');
            expect(res.body.data).to.have.property('token');
            expect(res.body.data).to.have.property('info');
            expect(res.body.data.info).to.be.an('object');
            done();
          });
      });
    })
    describe('실패시', () => {
      it('비밀번호를 잘못 입력했을때 400을 반환한다', done => {
        chai.request(server)
          .post('/api/auth/sign-in')
          .send({
            email: 'email@email.com',
            password: '4321',
          })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.status).to.deep.equal(false);
            done();
          });
      });

    })
  })
  describe('/GET exists/email은', () => {
    describe('성공시', () => {
      it('이미 존재하는 이메일을 입력했을때 200반환', done => {
        chai.request(server)
          .get('/api/auth/exists/email/email@email.com')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.status).to.deep.equal(true);
            done();
          });
      });
    })
    describe('실패시', () => {
      it('사용 가능한 이메일 입력시 404 반환', done => {
        chai.request(server)
          .get('/api/auth/exists/email/available@email.com')
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body.status).to.deep.equal(false);
            done();
          });
      });

    })
  })
  describe('/GET me', () => {
    describe('성공시', () => {
      const auth = {};
      before(loginUser(auth));
      it('로그인 후 요청시, 200반환', done => {
        chai.request(server)
          .get('/api/auth/me')
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.status).to.deep.equal(true);
            expect(res.body.data).to.be.an('object');
            expect(res.body.data).to.have.property('token');
            expect(res.body.data).to.have.property('info');
            expect(res.body.data.info).to.be.an('object');
            done();
          });
      });
    })
    describe('실패시', () => {
      it('비로그인 요청시, 401 반환', done => {
        chai.request(server)
          .get('/api/auth/me')
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body.status).to.deep.equal(false);
            done();
          });
      });

    })
  })
});

function loginUser(auth) {
  return done => {
    chai.request(server)
      .post('/api/auth/sign-in')
      .send({
        email: 'email@email.com',
        password: '1234',
      })
      .end((err, res) => {
        auth.token = res.body.data.token
        auth.cookies = res.headers['set-cookie'].pop().split(';')[0];
        done();
      })
  }
}