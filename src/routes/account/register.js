const Boom = require('boom');
const dataManager = require('../../data/dataManager');

module.exports = {
  method: 'POST',
  path: '/api/account/register',
  handler: async (req) => {
    const {username, email, password} = req.payload;

    if (!username || !email || !password) {
      return Boom.badData('Must provide username, email and password');
    }

    let err;

    let created = await dataManager.CreateAccount(username, password, email).catch(error => {
      console.error('Error in create user', error);

      if (error.message === 'Duplicate username') {
        err = Boom.conflict('Username or email taken');
      }else{
        throw error;
      }
      
    })

    if (err) {
      return err;
    }

    return created;
  },
  config: {
    auth: false,
    cors: true,
    pre: [],
  },
};
