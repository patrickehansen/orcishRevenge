const game = require('../../game/game');

module.exports = {
  method: 'GET',
  path: '/api/game/players',
  handler: async (req) => {
    const players = game.getPlayers();

    return players.map(v => {
      return {
        PlayerName: v.user.Username,
        Type: v.type,
      }
    })
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
