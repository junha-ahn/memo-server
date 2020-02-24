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
  const tmp = new Tag({
    name: '테스트',
  });

  before(async () => {
    await chai.request(server).post('/api/auth/sign-up').send(tester)
  })
  beforeEach(async () => { //Before test we empty the database
    await Tag.deleteMany();
  });
  describe('/GET tag는', () => {
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
      const auth = {};
      before(loginUser(auth));
      it('비로그인 요청시, 401 반환', async () => {
        const res = await chai.request(server)
          .get('/api/tag')
        expect(res).to.have.status(401);
        expect(res.body.status).to.deep.equal(false);
      });

    })
  })
  describe('/GET /tag/:_id는', () => {
    describe('성공시', () => {
      const auth = {};
      before(loginUser(auth));
      it('200 반환', async () => {
        const tag = await tmp.save()
        const res = await chai.request(server).get(`/api/tag/${tag._id.toString()}`)
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
          .send()
        expect(res).to.have.status(200);
        expect(res.body.status).to.deep.equal(true);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('_id');
      });
    });
    describe('실패시', () => {
      const auth = {};
      before(loginUser(auth));
      it('존재하지 않는 메모를 찾을 경우, 404 반환', async () => {
        const res = await chai.request(server).get('/api/tag/5e53d01b7d7d870418d444d3')
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
          .send()
        expect(res).to.have.status(404);
        expect(res.body.status).to.deep.equal(false);
      });
    });
  })
  describe('/POST /tag는', () => {
    describe('성공시', () => {
      const auth = {};
      before(loginUser(auth));
      it('201을 리턴한다, 생성한 객체를 반환한다', async () => {
        const res = await chai.request(server).post('/api/tag')
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
          .send({
            name: '서울'
          })
        expect(res).to.have.status(201);
        expect(res.body.status).to.deep.equal(true);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('_id');
      });
    });
    describe('실패시', () => {
      const auth = {};
      before(loginUser(auth));
      it('name 값 오류시, validator 오류를 반환한다', async () => {
        const res = await chai.request(server).post('/api/tag')
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
          .send({
            name: null
          })
        expect(res).to.have.status(422);
        expect(res.body.status).to.deep.equal(false);
        expect(res.body.data).to.be.an('array');
      });
    });
  })
  describe('/PUT /tag/:_id는', () => {
    describe('성공시', () => {
      const auth = {};
      before(loginUser(auth));
      it('201 반환', async () => {
        const tag = await tmp.save()
        const res = await chai.request(server).put(`/api/tag/${tag._id.toString()}`)
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
          .send({
            name: '한국',
          })
        expect(res).to.have.status(201);
        expect(res.body.status).to.deep.equal(true);
      });
    });
    describe('실패시', () => {
      const auth = {};
      before(loginUser(auth));
      it('존재하지 않는 메모를 찾을 경우, 400 반환', async () => {
        const res = await chai.request(server).put('/api/tag/5e53d01b7d7d870418d444d3')
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
          .send({
            name: '변경',
          })
        expect(res).to.have.status(400);
        expect(res.body.status).to.deep.equal(false);
      });
    });
  })
  describe('/DELETE /tag/:_id는', () => {
    describe('성공시', () => {
      const auth = {};
      before(loginUser(auth));
      it('200 반환', async () => {
        const tag = await tmp.save()
        const res = await chai.request(server).delete(`/api/tag/${tag._id.toString()}`)
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
          .send()
        expect(res).to.have.status(200);
        expect(res.body.status).to.deep.equal(true);
      });
    });
    describe('실패시', () => {
      const auth = {};
      before(loginUser(auth));
      it('존재하지 않는 메모를 찾을 경우, 400 반환', async () => {
        const res = await chai.request(server).delete('/api/tag/5e53d01b7d7d870418d444d3')
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
          .send()
        expect(res).to.have.status(400);
        expect(res.body.status).to.deep.equal(false);
      });
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