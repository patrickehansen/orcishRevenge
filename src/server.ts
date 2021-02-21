import Hapi from '@hapi/hapi';
import fastGlob from 'fast-glob';
import path from 'path';
import inert from '@hapi/inert';
import hapiAuthJWT from 'hapi-auth-jwt2';
import socketServer from './socket/socketServer';

import * as token from './util/token';
import config from './config';

export async function initialize() {
  const server = new Hapi.Server({
    host: process.env.HOST,
    port: process.env.PORT,
    routes: {
      files: {
        relativeTo: path.join(__dirname, '..', '..', 'static')
      }
    }
  });

  const pather = path.join(__dirname, '..', '..', 'static')

  await server.register(inert);
  await server.register(hapiAuthJWT);
  const socket = new socketServer(server.listener);
  console.log('Socket?', !!socket);
  
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

  const files = fastGlob.sync(['dist/src/routes/**/*.js'], {dot: true})

  const promises = files.map(async (filename) => {
    console.log(`attempting to route ${filename}`);
    if (!filename.includes('.spec.') && !filename.includes('mock.')) {
      
      let newPath;
      if (__dirname.includes('dist')) {
        newPath = path.resolve(__dirname,  filename.slice(9));
      }else{
        newPath = path.resolve(__dirname.slice(0, -3),  filename);
      }

      const imported = await import(newPath);
      try {
        console.log(`routing ${imported.default.method} : ${imported.default.path}`);
        server.route(imported.default);
      }catch(err) {
        console.error('Error routing', err)
      }
    }
  })

  await Promise.all(promises);

  try {
    await server.start();
  }
  catch (err) {
    console.error('Error starting server', err);
  }
  
  return server;
}
