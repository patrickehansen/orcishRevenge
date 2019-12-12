const Boom = require('boom');
const dataManager = require('../../data/dataManager');

module.exports = {
  method: 'POST',
  path: '/api/notepad',
  handler: async (req) => {
    const {Title, Text, CharacterID} = req.payload;

    const notepad = await dataManager.CreateNotepad(Title, Text).catch(e => {
      throw Boom.badImplementation()
    });

    let character;

    if (CharacterID) {
      character = await dataManager.AddNotepadToCharacter(CharacterID, notepad._notepadid);
    }

    return {
      notepad,
      character
    };
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
