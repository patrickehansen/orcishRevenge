import { register } from '../../handlers/account';

module.exports = {
  method: 'POST',
  path: '/api/account/register',
  handler: register,
  config: {
    auth: false,
    cors: true,
    pre: [],
    validate: {

    }
  },
};
