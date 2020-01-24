const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/app');
const User = $require('models/user');
const expect = chai.expect;

chai.use(chaiHttp);

describe('User', () => {
  beforeEach((done) => { //Before each test we empty the database
    User.remove({}, (err) => {
      done();
    });
  });
  describe('/POST signup', () => {
    const user = {
      password: '1234',
      name: '테스트'
    }
    it('it should not POST a user without email field', done => {
      chai.request(server)
        .post('/api/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.status).to.deep.equal(false);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
    user.email = 'email@email.com'
    it('it should POST a user', done => {
      chai.request(server)
        .post('/api/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.deep.equal(true);
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.property('_id');
          done();
        });
    });
    it('it should not POST a user duplication email', done => {
      chai.request(server)
        .post('/api/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.status).to.deep.equal(false);
          done();
        });
    });

  })
  describe('/POST signin', () => {
    it('it should not return token with wrong Password', done => {
      chai.request(server)
        .post('/api/auth/signin')
        .send({
          eamil: 'email@email.com'
          password: '4321',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.deep.equal(false);
          done();
        });
    });
    it('it should return token', done => {
      chai.request(server)
        .post('/api/auth/signin')
        .send({
          eamil: 'email@email.com'
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
  describe('/GET exists/email', () => {
    it('it should GET success with duplication email', done => {
      chai.request(server)
        .get('/api/auth/exists/email/email@email.com')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.deep.equal(true);
          done();
        });
    });
    it('it should GET fail with available email', done => {
      chai.request(server)
        .get('/api/auth/exists/email/available@email.com')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.deep.equal(false);
          done();
        });
    });
  })
});