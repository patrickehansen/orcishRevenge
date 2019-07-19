const ms = require('ms');

module.exports = {
    secret: process.env.secret || 'secret',
    host: '0.0.0.0',
    port: process.env.PORT || 6190,
    mode: process.env.mode || 'Dev',
    mongoUrl: 'mongodb://orcishrevenge:qPJE8sRrMnG#%vBj@ds345597.mlab.com:45597/orcishrevenge',
    tokenExpiration: ms(process.env.tokenExpiration || '30d')
}