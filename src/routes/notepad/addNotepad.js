const Boom = require('boom');
const dataManager = require('../../data/dataManager');

module.exports = {
  method: 'POST',
  path: '/api/notepad',
  handler: async (req) => {
    const notepad = await dataManager.CreateNotepad().catch(e => {
      throw Boom.badImplementation()
    });

    return notepad;
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
