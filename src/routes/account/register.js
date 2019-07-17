'use strict';
const Boom = require('boom');
const dataManager = require('../../data/dataManager');
const config = require('../../../config');

module.exports = {
  method: 'POST',
  path: '/api/account/register',
  handler: async (req) => {
    console.log('hey register')
  },
  config: {
    auth: false,
    cors: true,
    pre: [],
  },
};
