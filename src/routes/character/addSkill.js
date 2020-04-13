const Boom = require('boom');
const dataManager = require('../../data/dataManager');

module.exports = {
  method: 'PUT',
  path: '/api/character/skills/create',
  handler: async (req) => {
    let err;

    const updated = await dataManager.AddSkill(req.payload, req.pre.user.id).catch(error => {
      console.error('Error creating skill', error);
      err = error;
    })

    if (err) {
      return Boom.badImplementation(err.message);
    }

    if (updated) {
      // Tell the socket server that an update has been made to this character and send out the new data
    }

    return updated;
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
