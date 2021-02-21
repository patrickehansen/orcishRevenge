
module.exports = {
  method: 'GET',
  path: '/api/games',
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
