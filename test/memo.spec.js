const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src/app");
const Memo = $require("models/memo");
const expect = chai.expect;
const NOT_FOUND_ID = '5e53d01b7d7d870418d444d3'

chai.use(chaiHttp);

const tester = {
  email: "email@email.com",
  password: "1234",
  name: "테스트"
};
describe("Memo", () => {
  const auth = {};

  const tmp = new Memo({
    title: "제목",
    // userId, tester 의 userId 문제..
    content: "내용",
    isFixed: 0,
  });

  before(async () => {
    await chai
      .request(server)
      .post("/api/auth/sign-up")
      .send(tester);
  });
  beforeEach(async () => {
    //Before test we empty the database
    await Memo.deleteMany();
  });
  describe("/GET /momo는", () => {
    before(loginUser(auth));
    describe("성공시", () => {
      // 특정 조건을 통한 조회시, 해당 results가 조건에 맞는지 체크 가능?..
      it("200 반환", async () => {
        const res = await chai
          .request(server)
          .get("/api/memo")
          .set("Authorization", `Bearer ${auth.token}`)
          .set("Cookie", auth.cookies)
          .query({
            pageNum: 1,
            pageLength: 100
          });
        expect(res).to.have.status(200);
        expect(res.body.status).to.deep.equal(true);
        expect(res.body.data).to.be.an("object");
        expect(res.body.data).to.have.property("count");
        expect(res.body.data).to.have.property("results");
        expect(res.body.data.results).to.be.an("array");
      });
    });
    describe("실패시", () => {
      it("page 값 오류시, validator 오류를 반환한다", async () => {
        const res = await chai
          .request(server)
          .get("/api/memo")
          .set("Authorization", `Bearer ${auth.token}`)
          .set("Cookie", auth.cookies)
          .send();
        expect(res).to.have.status(422);
        expect(res.body.status).to.deep.equal(false);
        expect(res.body.data).to.be.an("array");
      });
      it("tagIds 값 오류시, validator 오류를 반환한다", async () => {
        const res = await chai
          .request(server)
          .get("/api/memo")
          .set("Authorization", `Bearer ${auth.token}`)
          .set("Cookie", auth.cookies)
          .send({
            pageNum: 1,
            pageLength: 100,
            tagIds: ["id"]
          });
        expect(res).to.have.status(422);
        expect(res.body.status).to.deep.equal(false);
        expect(res.body.data).to.be.an("array");
      });
    });
  });
  describe('/GET /momo/:_id는', () => {
    // validator 관련 
    // TAG 관련... RESPONSE 존재...
    // TAG 관련... ID 검색 가능
    describe('성공시', async () => {
      const memo = await tmp.save()
      it('200 반환', async () => {
        const res = await chai.request(server).get(`/api/memo/${memo._id.toString()}`)
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
          .send()
        expect(res).to.have.status(200);
        expect(res.body.status).to.deep.equal(true);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('_id');
        expect(res.body.data).to.have.property('tags');
        expect(res.body.data.tags).to.be.an('array');
      });
    });
    describe('실패시', () => {
      it('존재하지 않는 메모를 찾을 경우, 404 반환', async () => {
        const res = await chai.request(server).get(`/api/memo/${NOT_FOUND_ID}`)
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
            title: '대한민국 맛집 TOP 10',
            content: '...내용',
          })
        expect(res).to.have.status(201);
        expect(res.body.status).to.deep.equal(true);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('_id');
        expect(res.body.data).to.have.property('tags');
      });
    });
    describe('실패시', () => {
      it('isFixed 값 오류시, validator 오류를 반환한다', async () => {
        const res = await chai.request(server).post('/api/memo')
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
          .send({
            isFixed: 2,
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
      before(loginUser(auth));
      it('201 반환', async () => {
        const memo = await new Memo({
          title: "제목",
          userId: auth.info._id,
          content: "내용",
          isFixed: 0,
        }).save()
        const res = await chai.request(server).put(`/api/memo/${memo._id.toString()}`)
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
          .send({
            title: '제목_수정',
            content: '내용_수정',
            isFixed: 0,
          })
        expect(res).to.have.status(201);
        expect(res.body.status).to.deep.equal(true);
      });
    });
    describe('실패시', () => {
      before(loginUser(auth));
      it('존재하지 않는 메모를 찾을 경우, 400 반환', async () => {
        const res = await chai.request(server).put(`/api/memo/${NOT_FOUND_ID}`)
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Cookie', auth.cookies)
          .send({
            isFixed: 0,
            title: '변경',
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
        const memo = await new Memo({
          title: "제목",
          userId: auth.info._id,
          content: "내용",
          isFixed: 0,
        }).save()
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
        const res = await chai.request(server).delete(`/api/memo/${NOT_FOUND_ID}`)
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
    chai
      .request(server)
      .post("/api/auth/sign-in")
      .send(tester)
      .end((err, res) => {
        auth.token = res.body.data.token;
        auth.info = res.body.data.info
        auth.cookies = res.headers["set-cookie"].pop().split(";")[0];
        done();
      });
  };
}