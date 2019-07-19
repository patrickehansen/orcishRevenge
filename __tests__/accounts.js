const database = require('../src/data/database');
const dataManager = require('../src/data/dataManager');
const register = require('../src/routes/account/register');

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

    //console.log('Well I guess createdAgain is', Object.keys(createdAgain), createdAgain.output, createdAgain.output.payload);


    expect(createdAgain.output.payload.message).toBe('Username taken');

    done();
  })
  
  afterAll(async () => {
    await dataManager.DeleteAccount(payload.username);

    database.Close();
  })
})