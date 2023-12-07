var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../server')
var User = require("../models/user");
// var sleep = require('sleep');
chai.use(chaiHttp);
var mockUser;

describe('User crud unit tests', () => {

    User.collection.drop();

    beforeEach((done) => {
        mockUser = new User({
            username: 'test',
            password: 'data',
            email: 'testdata'
        });
        mockUser.save(function (err) {
            done();
        });
    });

    afterEach((done) => {
        User.collection.drop();
        done();
    });

    describe('/getUsers', () => {
        it('should list ALL users', (done) => {
            chai.request(server)
                .get('/getUsers')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('_id');
                    res.body[0].should.have.property('username');
                    res.body[0].should.have.property('password');
                    res.body[0].should.have.property('email');
                    res.body[0].username.should.equal(mockUser.username);
                    res.body[0].password.should.equal(mockUser.password);
                    res.body[0].email.should.equal(mockUser.email);
                    done();
                });
        });
    });

    
});
