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
  const auth = {};

  const tmp = new Memo({
    title: '제목',
    content: '내용',
    isFixed: 0,
  });

  before(async () => {
    await chai.request(server).post('/api/auth/sign-up').send(tester);
    before(loginUser(auth));
  })
  beforeEach(async () => { //Before test we empty the database
    await Memo.deleteMany();
  });
  describe('/GET /momo는', () => {
    describe('성공시', () => {
      // 특정 조건을 통한 조회시, 해당 results가 조건에 맞는지 체크 가능?..
      it('200 반환', async () => {
        const res = await chai.request(server).get('/api/memo')
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
          .send({
            pageNum: 1,
            pageLength: 100,
          })
        expect(res).to.have.status(200);
        expect(res.body.status).to.deep.equal(true);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('count');
        expect(res.body.data).to.have.property('results');
        expect(res.body.data.results).to.be.an('array');
      });
      it('태그 조회시, 200 반환', async () => {
        const res = await chai.request(server).get('/api/memo')
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
          .send({
            pageNum: 1,
            pageLength: 100,
            tagIds: [1, 2, 3],
          })
        expect(res).to.have.status(200);
        expect(res.body.status).to.deep.equal(true);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('count');
        expect(res.body.data).to.have.property('results');
        expect(res.body.data.results).to.be.an('array');
      });
    });
    describe('실패시', () => {
      it('page 값 오류시, validator 오류를 반환한다', async () => {
        const res = await chai.request(server).get('/api/memo')
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
          .send()
        expect(res).to.have.status(422);
        expect(res.body.status).to.deep.equal(false);
        expect(res.body.data).to.be.an('array');
      });
      it('tagIds 값 오류시, validator 오류를 반환한다', async () => {
        const res = await chai.request(server).get('/api/memo')
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
          .send({
            pageNum: 1,
            pageLength: 100,
            tagIds: ['id']
          })
        expect(res).to.have.status(422);
        expect(res.body.status).to.deep.equal(false);
        expect(res.body.data).to.be.an('array');
      });
    });
  })
  describe('/GET /momo/:_id는', () => {
    // validator 관련 
    // TAG 관련... RESPONSE 존재...
    // TAG 관련... ID 검색 가능
    describe('성공시', () => {
      it('200 반환', async () => {
        const res = await chai.request(server).get('/api/memo/_not_found')
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
          .send()
        expect(res).to.have.status(200);
        expect(res.body.status).to.deep.equal(true);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('_id');
        expect(res.body.data).to.have.property('tagIds');
      });
      it('tags 반환', async () => {
        const res = await chai.request(server).get('/api/memo/_not_found')
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
          .send()
        expect(res).to.have.status(200);
        expect(res.body.status).to.deep.equal(true);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('_id');
        expect(res.body.data).to.have.property('tags');
        expect(res.body.data).to.have.property('tagIds');
        expect(res.body.data.tags).to.be.an('array');
        expect(res.body.data.tagIds).to.be.an('array');
      });
    });
    describe('실패시', () => {
      it('존재하지 않는 메모를 찾을 경우, 404 반환', async () => {
        const res = await chai.request(server).get('/api/memo/_not_found')
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
          .send()
        expect(res).to.have.status(404);
        expect(res.body.status).to.deep.equal(false);
      });
    });
  })
  describe('/POST /memo는', () => {
    describe('성공시', () => {
      it('201을 리턴한다, 생성한 객체를 반환한다', async () => {
        const res = await chai.request(server).post('/api/memo')
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
          .send({
            isFixed: 0,
            tags: ['개인', '맛집'],
            title: '대한민국 맛집 TOP 10',
            content: '...내용',
          })
        expect(res).to.have.status(201);
        expect(res.body.status).to.deep.equal(true);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('_id');
        expect(res.body.data).to.have.property('tagIds');
      });
    });
    describe('실패시', () => {
      it('isFixed 값 오류시, validator 오류를 반환한다', async () => {
        const res = await chai.request(server).post('/api/memo')
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
          .send({
            isFixed: 2,
            tags: ['개인', '맛집'],
            title: '대한민국 맛집 TOP 10',
            content: '...내용',
          })
        expect(res).to.have.status(422);
        expect(res.body.status).to.deep.equal(false);
        expect(res.body.data).to.be.an('array');
      });
      it('title을 전송하지 않을 경우, validator 오류를 반환한다', async () => {
        const res = await chai.request(server).post('/api/memo')
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
          .send({
            isFixed: 0,
            tags: ['개인', '맛집'],
            content: '...내용',
          })
        expect(res).to.have.status(422);
        expect(res.body.status).to.deep.equal(false);
        expect(res.body.data).to.be.an('array');
      });
    });
  })
  describe('/PUT /memo/:_id는', () => {
    describe('성공시', () => {
      it('201 반환', async () => {
        const memo = await tmp.save()
        const res = await chai.request(server).put(`/api/memo/${memo._id.toString()}`)
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
          .send({
            title: '제목_수정',
            content: '내용_수정',
            isFixed: 0,
          })
        expect(res).to.have.status(200);
        expect(res.body.status).to.deep.equal(true);
      });
      it('태그 추가시, 201 반환', async () => {
        const memo = await tmp.save()
        const res = await chai.request(server).put(`/api/memo/${memo._id.toString()}`)
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
          .send({
            title: '제목_수정',
            content: '내용_수정',
            tags: ['대한민국', '서울', '맛집'],
            isFixed: 0,
          })
        expect(res).to.have.status(200);
        expect(res.body.status).to.deep.equal(true);
      });
      it('태그 제거시, 201 반환', async () => {
        const memo = await tmp.save()
        const res = await chai.request(server).put(`/api/memo/${memo._id.toString()}`)
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
          .send({
            title: '제목_수정',
            content: '내용_수정',
            tags: ['서울', '맛집'],
            isFixed: 1,
          })
        expect(res).to.have.status(200);
        expect(res.body.status).to.deep.equal(true);
      });
    });
    describe('실패시', () => {
      it('존재하지 않는 메모를 찾을 경우, 400 반환', async () => {
        const res = await chai.request(server).put('/api/memo/_not_found')
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
          .send({
            isFixed: 0,
            title: '변경',
            tags: ['개인', '맛집'],
            content: '...내용',
          })
        expect(res).to.have.status(400);
        expect(res.body.status).to.deep.equal(false);
      });
    });
  })
  describe('/DELETE /memo/:_id는', () => {
    describe('성공시', () => {
      it('200 반환', async () => {
        const memo = await tmp.save()
        const res = await chai.request(server).delete(`/api/memo/${memo._id.toString()}`)
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
          .send()
        expect(res).to.have.status(200);
        expect(res.body.status).to.deep.equal(true);
      });
    });
    describe('실패시', () => {
      it('존재하지 않는 메모를 찾을 경우, 400 반환', async () => {
        const res = await chai.request(server).delete('/api/memo/_not_found')
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
          .send()
        expect(res).to.have.status(400);
        expect(res.body.status).to.deep.equal(false);
      });
    });
  })
  describe('/PUT /memo/fix/:_id는', () => {
    describe('성공시', () => {
      it('200 반환', async () => {
        const memo = await tmp.save()
        const res = await chai.request(server).put(`/api/memo/fix/${memo._id.toString()}`)
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
          .send({
            isFixed: 1,
          })
        expect(res).to.have.status(200);
        expect(res.body.status).to.deep.equal(true);
      });
    });
    describe('실패시', () => {
      it('이미 해당 상태일 경우, 409 반환', async () => {
        const memo = await tmp.save()
        const res = await chai.request(server).put(`/api/memo/fix/${memo._id.toString()}`)
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
          .send({
            isFixed: 0,
          })
        expect(res).to.have.status(409);
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