
module.exports = {
  method: 'PUT',
  path: '/api/game/{gameId}/character',
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
