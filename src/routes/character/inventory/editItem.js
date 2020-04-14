const Boom = require('boom');
const dataManager = require('../../../data/dataManager');

module.exports = {
  method: 'POST',
  path: '/api/character/items/edit',
  handler: async (req) => {
    let err;

    const updated = await dataManager.EditItem(req.payload, req.pre.user.id).catch(error => {
      console.error('Error editting item', error);
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
