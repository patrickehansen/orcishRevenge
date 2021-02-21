var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const expect = require('chai').expect;
const database = require('../src/data/database');
const dataManager = require('../src/data/dataManager');
const register = require('../src/routes/account/register');
const login = require('../src/routes/account/login');
describe('accounts', () => {
    before(() => __awaiter(this, void 0, void 0, function* () {
        while (!database.Ready) {
            yield new Promise(resolve => setTimeout(resolve, 100));
        }
    }));
    payload = {
        username: 'TestUser',
        email: 'TestUser@gmail.com',
        password: 'testpasswrd',
    };
    it('creates an account', () => __awaiter(this, void 0, void 0, function* () {
        let wasCreated = yield register.handler({ payload }).catch(error => {
            console.error('Error in handler', error);
            throw error;
        });
        expect(wasCreated).to.be.true;
    }));
    it('cannot create duplicate account', () => __awaiter(this, void 0, void 0, function* () {
        let err;
        let createdAgain = yield register.handler({ payload }).catch(error => {
            console.error('Error in handler', error);
            throw error;
        });
        expect(createdAgain.output.payload.message).to.equal('Username or email taken');
    }));
    it('logs in successfully', () => __awaiter(this, void 0, void 0, function* () {
        let loginResponse = yield login.handler({ payload }).catch(error => {
            console.error('Error in login', error);
        });
        expect(typeof loginResponse.id_token).to.equal('string');
    }));
    it('bad password does not work', () => {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let loginResponse = yield login.handler({ payload: {
                    username: payload.username,
                    password: 'wrongPass',
                } }).catch(error => {
                console.error('Error in login', error);
            });
            console.log(Object.keys(loginResponse));
            expect(loginResponse.output.payload.message).to.equal('Username or password incorrect.');
            resolve();
        }));
    });
    after((done) => {
        dataManager.DeleteAccount(payload.username).then(() => {
            done();
            // database.Connection.close();
            // database.Connection.on('disconnected', done);
        });
    });
});
//# sourceMappingURL=accounts.test.js.map