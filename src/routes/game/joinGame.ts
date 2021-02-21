
module.exports = {
  method: 'POST',
  path: '/api/games/{gameId}/join',
  handler: async (req) => {},
  config: {
    auth: 'jwt',
    cors:  {
      origin: ['*'],
      additionalHeaders: ['cache-control', 'x-requested-with']
    },
    pre: [],
  },
};
