import {getAccount} from '../../handlers/account';

module.exports = {
  method: 'GET',
  path: '/api/account/details',
  handler: getAccount,
  config: {
    auth: 'jwt',
    cors:  {
      origin: ['*'],
      additionalHeaders: ['cache-control', 'x-requested-with']
    },
    pre: [],
    validate: {

    }
  },
};
