const Boom = require('boom');
const dataManager = require('../../data/dataManager');

module.exports = {
  method: 'PATCH',
  path: '/api/notepad',
  handler: async (req) => {
    const saved = await dataManager.SaveNotepad(req.payload).catch(e => {
      throw Boom.badImplementation();
    })

    return saved;
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
