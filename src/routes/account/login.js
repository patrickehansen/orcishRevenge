'use strict';
const Boom = require('boom');
const dataManager = require('../../data/dataManager');
const config = require('../../../config');
const token = require('../../util/token');

module.exports = {
  method: 'POST',
  path: '/api/account/login',
  handler: async (req) => {
    const {username, password} = req.payload;

    if (!username || !password) {
      return Boom.unauthorized('Username or password not provided.')
    }

    let err;

    let isValid = await dataManager.VerifyUser(username, password).catch(error => {
      console.error('Error in verify user', error);
      err = Boom.badImplementation(error.message);
    })

    if (err) {
      return err;
    }

    if (isValid) {
      let idToken = token.generateToken(username);

      return {
        id_token: idToken,
      }
    }

    return Boom.unauthorized('Username or password incorrect.')
  },
  config: {
    auth: false,
    cors: config.mode === 'Dev',
    pre: [],
  },
};
