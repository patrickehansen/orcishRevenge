const Boom = require('boom');
const dataManager = require('../../data/dataManager');

module.exports = {
  method: 'GET',
  path: '/api/notepad/{id}',
  handler: async (req) => {
    let id = req.params.id;

    const notepad = await dataManager.GetNotepad(id).catch(e => {
      console.error('Error getting notepad', e);
      throw Boom.badImplementation();
    })

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
