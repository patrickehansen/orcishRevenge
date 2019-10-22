const Boom = require('boom');
const dataManager = require('../../data/dataManager');

module.exports = {
  method: 'GET',
  path: '/api/character/available',
  handler: async (req) => {
    let err;

    let characters = await dataManager.GetAvailableCharacters(req.pre.user).catch(error => {
      console.error('Error getting available characters', error);
      err = error;
    });

    if (err) {
      return Boom.badImplementation(err.message);
    }

    return characters;
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
