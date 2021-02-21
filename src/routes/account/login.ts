import { login } from '../../handlers/account';

module.exports = {
  method: 'POST',
  path: '/api/account/login',
  handler: login,
  config: {
    auth: false,
    cors: true,//config.mode === 'Dev',
    pre: [],
    validate: {
      
    }
  },
};
