import chai from "chai";
import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import AppRouting from "../src/AppRouting";

var expect = chai.expect;
describe('API Tests', () => {
    const app = express();
    const appRouting = new AppRouting(app);
    appRouting.routes();
    app.use(bodyParser.json());

    describe('Testing posting APIs', () => {
        it('Should return a successful posting of adding a new waiter to the database', (done) => {
            request(app)
                .post('/api/add/waiter')
                .send({ first: 'Dyllan', last: "Hope", pass: "123" })
                .end((err, res) => {
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
    });
});