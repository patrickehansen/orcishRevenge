const Boom = require('boom');
const dataManager = require('../../../data/dataManager');

module.exports = {
  method: 'POST',
  path: '/api/character/skillSection/delete',
  handler: async (req) => {
    let err;

    const updated = await dataManager.DeleteSkillSection(req.payload, req.pre.user.id).catch(error => {
      console.error('Error deleting skill section', error);
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
