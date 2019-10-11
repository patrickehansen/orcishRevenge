'use strict';
const Boom = require('boom');
const dataManager = require('../../data/dataManager');
const config = require('../../../config');

module.exports = {
  method: 'PUT',
  path: '/api/character/create',
  handler: async (req) => {
    let err;

    let success = await dataManager.CreateCharacter(req.payload, req.pre.user.id).catch(error => {
      console.error('Error creating character', error);
      err = error;
    })

    if (err) {
      return Boom.badImplementation(err.message);
    }

    return success;
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
