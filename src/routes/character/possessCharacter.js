const Boom = require('boom');
const dataManager = require('../../data/dataManager');
const game = require('../../game/game');

module.exports = {
  method: 'POST',
  path: '/api/character/possess',
  handler: async (req) => {
    const {CharacterID} = req.payload;

    if (CharacterID === 'spectator') {
      game.addSpectator(req.pre.user);

      return 'spectator';
    } else if (CharacterID === 'gm') {
      if (req.pre.user.IsGM) {
        game.addGM(req.pre.user);

        return 'gm';
      }else{
        return Boom.forbidden('You are not GM qualified');
      }
    } else {

      // Are we allowed to possess this character?
      let characters = await dataManager.GetAvailableCharacters(req.pre.user).catch(error => {
        console.error('Error getting available characters', error);
        err = error;
      });
  
      const found = characters.find(v => v.id == CharacterID);
      
      if (!found) {
        return Boom.badData('Character not permitted or found.')
      }
  
      // Get the extended character info and map it to the character
  
      // Let the game know that the character has been possessed
      game.addPlayer(req.pre.user, found);
  
      // Return the character
      return found;
    }
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
