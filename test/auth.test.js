const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src/app");
const expect = chai.expect;

chai.use(chaiHttp);

describe("Request test", () => {
  it("request to server", done => {
    chai
      .request(server)
      .get("/api/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals('Hello World');
        done();
      });
  });
});