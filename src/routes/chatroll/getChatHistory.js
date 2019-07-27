'use strict';
const Boom = require('boom');
const dataManager = require('../../data/dataManager');
const config = require('../../../config');

module.exports = {
  method: 'GET',
  path: '/api/chatroll/chatHistory',
  handler: async (req) => {
    let err;
    let history = await dataManager.GetChatHistory().catch(error => {
      console.error('Error getting chat history', error);
      err = error;
    })

    if (err) {
      return Boom.badImplementation(err.message);
    }

    return history;
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
