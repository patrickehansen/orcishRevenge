const expect = require('chai').expect;

const database = require('../src/data/database');
const dataManager = require('../src/data/dataManager');
const register = require('../src/routes/account/register');
const login = require('../src/routes/account/login');

describe('accounts', () => {
  before(async () => {
    while(!database.Ready) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  })

  payload = {
    username: 'TestUser', 
    email: 'TestUser@gmail.com', 
    password: 'testpasswrd',
  }

  it('creates an account', async () => {
    let wasCreated = await register.handler({payload}).catch(error => {
      console.error('Error in handler', error);
      throw error;
    });

    expect(wasCreated).to.be.true;
  })

  it('cannot create duplicate account', async () => {
    let err;

    let createdAgain = await register.handler({payload}).catch(error => {
      console.error('Error in handler', error);
      throw error;
    });

    expect(createdAgain.output.payload.message).to.equal('Username or email taken');

  })

  it('logs in successfully', async () => {
    let loginResponse = await login.handler({payload}).catch(error => {
      console.error('Error in login', error);
    })

    expect(typeof loginResponse.id_token).to.equal('string');
  })

  it('bad password does not work', () => {
    return new Promise(async (resolve, reject) => {
      let loginResponse = await login.handler({payload: {
        username: payload.username,
        password: 'wrongPass',
      }}).catch(error => {
        console.error('Error in login', error);
      })
  
      console.log(Object.keys(loginResponse));
  
      expect(loginResponse.output.payload.message).to.equal('Username or password incorrect.');
  
      resolve();
    })
  })
  
  after((done) => {
    dataManager.DeleteAccount(payload.username).then(() => {
      done();
      // database.Connection.close();
      // database.Connection.on('disconnected', done);
    });
  })
})

