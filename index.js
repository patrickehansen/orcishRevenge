const Hapi = require('@hapi/hapi');
const glob = require('glob');
const path = require('path');
const inert = require('@hapi/inert');
const hapiAuthJWT = require('hapi-auth-jwt2');

const socketServer = require('./src/socket/socketServer');
const config = require ('./config');
const token = require('./src/util/token');
const database = require('./src/data/database');
const dataManager = require('./src/data/dataManager');
const diceRoller = require('./src/game/diceRoller');

require('console-ten').init(console);
//Setup the server
const init = async () => {
  
  const server = new Hapi.server({
    host: config.host,
    port: config.port,
    routes: {
      files: {
        relativeTo: path.join(__dirname, 'dist')
      }
    }
  });

  await server.register(inert);
  await server.register(hapiAuthJWT);
  const socket = new socketServer(server.listener);

  server.auth.strategy('jwt', 'jwt',
  {
    key: config.secret,
    validate: token.validateToken,
    verifyOptions: { 
      ignoreExpiration: true, //do not reject expired tokens. we will check if a refresh is necessary.
      algorithms: ['HS256']
    }
  });

  server.auth.default('jwt');

  glob.sync('src/routes/**/*.js', {
    root: __dirname
  }).forEach(file => {
    const route = require(path.join(__dirname, file));
    server.route(route);
  });
  
  try {
    await server.start();
  }
  catch (err) {
    console.log('Error starting server', err);
  }
  
  return server;
}

console.log('Starting up..');
const v8 = require('v8');

let totalHeapSize = v8.getHeapStatistics().total_available_size;
let inGB = (totalHeapSize / 1024 / 1024 / 1024).toFixed(2);

console.log(`Total heap size (bytes) ${totalHeapSize} (GB ~${inGB})`);

//Startup the server, then do some things
init().then(async (server) => {
  console.log('Server running at:', server.info.uri);
    
  while (!database.Ready) {
    await new Promise(resolve => setTimeout(resolve, 100))
  }
}).catch(error => {
  console.log(error);
});

process.on('unhandledRejection', async (err) => {
  console.log('unhandled rejection', err);
})

process.on('uncaughtException', err => {
    console.log('uncaught exception', err);
})

