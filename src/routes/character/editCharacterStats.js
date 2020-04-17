const Boom = require('boom');
const dataManager = require('../../data/dataManager');

module.exports = {
  method: 'PATCH',
  path: '/api/character/editStats',
  handler: async (req) => {
    let err;

    let success = await dataManager.EditCharacterStats(req.payload, req.pre.user.id).catch(error => {
      console.error('Error editting character stats', error);
      err = error;
    })

    if (err) {
      return Boom.badImplementation(err.message);
    }

    return success;
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
