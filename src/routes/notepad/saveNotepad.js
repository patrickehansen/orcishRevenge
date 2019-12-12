const Boom = require('boom');
const dataManager = require('../../data/dataManager');

module.exports = {
  method: 'PATCH',
  path: '/api/notepad',
  handler: async (req) => {
    const {NotepadID, Text, Title} = req.payload;

    await dataManager.SaveNotepad(NotepadID,Text, Title).catch(e => {
      throw Boom.badImplementation();
    })

    return id;
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
