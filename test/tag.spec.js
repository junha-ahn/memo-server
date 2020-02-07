const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/app');
const Tag = $require('models/tag');
const expect = chai.expect;

chai.use(chaiHttp);

const tester = {
  email: 'email@email.com',
  password: '1234',
  name: '테스트'
}
describe('Tag', () => {
  before(async () => {
    await chai.request(server).post('/api/auth/sign-up').send(tester)
  })
  beforeEach(async () => { //Before test we empty the database
    await Tag.deleteMany();
  });
  describe('/GET Tag', () => {
    describe('성공시', () => {
      const auth = {};
      before(loginUser(auth));
      it('로그인 후 요청시, 200반환', async () => {
        const res = await chai.request(server)
          .get('/api/tag')
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
        expect(res).to.have.status(200);
        expect(res.body.status).to.deep.equal(true);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('count');
        expect(res.body.data).to.have.property('results');
        expect(res.body.data.results).to.be.an('array');
      });
    })
    describe('실패시', () => {
      it('비로그인 요청시, 401 반환', async () => {
        const res = await chai.request(server)
          .get('/api/tag')
        expect(res).to.have.status(401);
        expect(res.body.status).to.deep.equal(false);
      });

    })
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