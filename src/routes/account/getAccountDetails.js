const Boom = require('boom');
const dataManager = require('../../data/dataManager');

module.exports = {
  method: 'GET',
  path: '/api/account/details',
  handler: async (req) => {
    let err;

    let account = await dataManager.FindAccount(req.pre.user.Username).catch(error => {
      console.error('Error getting available characters', error);
      err = error;
    });

    if (err) {
      return Boom.badImplementation(err.message);
    }

    const trimmed = {
      username: account.Username,
      isGM: account.IsGM,
    }

    return trimmed;
  },
  config: {
    auth: 'jwt',
    cors:  {
      origin: ['*'],
      additionalHeaders: ['cache-control', 'x-requested-with']
    },
    pre: [],
  },
};
