'use strict';
const Boom = require('boom');
const dataManager = require('../../data/dataManager');
const config = require('../../../config');
const game = require('../../game/game');

module.exports = {
  method: 'GET',
  path: '/api/game/characters',
  handler: async (req) => {
    // Not ready to do this at this point.
    const characters = game.getCharacters();
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
