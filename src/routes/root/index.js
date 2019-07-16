'use strict';

module.exports = {
  method: 'GET',
  path: '/{any*}',
  handler: {
    file: 'index.html'
  },
  config: {
    auth: false
  }
}
