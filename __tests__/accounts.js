const database = require('../src/data/database');
const dataManager = require('../src/data/dataManager');
const register = require('../src/routes/account/register');
const login = require('../src/routes/account/login');

describe('accounts', () => {
  beforeAll(async () => {
    while(!database.Ready) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  })

  payload = {
    username: 'TestUser', 
    email: 'TestUser@gmail.com', 
    password: 'testpasswrd',
  }

  test('creates an account', async (done) => {
    let wasCreated = await register.handler({payload}).catch(error => {
      console.error('Error in handler', error);
      throw error;
    });

    expect(wasCreated).toBe(true);
    done();
  })

  test('cannot create duplicate account', async (done) => {
    expect.assertions(1);
    let err;

    let createdAgain = await register.handler({payload}).catch(error => {
      console.error('Error in handler', error);
      throw error;
    });

    expect(createdAgain.output.payload.message).toBe('Username or email taken');

    done();
  })

  test('logs in successfully', async (done) => {
    let loginResponse = await login.handler({payload}).catch(error => {
      console.error('Error in login', error);
    })

    expect(typeof loginResponse.id_token).toBe('string');

    done();
  })

  test('bad password does not work', async (done) => {
    let loginResponse = await login.handler({payload: {
      username: payload.username,
      password: 'wrongPass',
    }}).catch(error => {
      console.error('Error in login', error);
    })

    console.log(Object.keys(loginResponse));

    expect(loginResponse.output.payload.message).toBe('Username or password incorrect.');

    done();
  })
  
  afterAll(async (done) => {
    await dataManager.DeleteAccount(payload.username);

    database.Connection.close();
    database.Connection.on('disconnected', done);
  })
})

