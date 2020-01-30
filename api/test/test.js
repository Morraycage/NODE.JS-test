// Import the dependencies for testing
var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style
const app = require('../index');
// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Players", () => {
    describe("GET /", () => {
        // Test to get all players record
        it("should get all players record", (done) => {
            chai.request('http://localhost:3000')
                .get('/players')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
        // Test to get single player record
        it("should get a single player record", (done) => {
            const id = 1;
            chai.request('http://localhost:3000')
                .get(`/players/17`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        // Test to get an unexisting player record
        it("should get a 404 error", (done) => {
            const id = 1;
            chai.request('http://localhost:3000')
                .get(`/players/${id}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

    });
});
