import consoleTen from 'console-ten';
import dotenv from 'dotenv-safe';
import v8 from 'v8';

consoleTen.init(console);
dotenv.config();

import { initialize } from './server';

let serve;
initialize().then(server => {
  const totalHeapSize = v8.getHeapStatistics().total_available_size;
  const inGB = (totalHeapSize / 1024 / 1024 / 1024).toFixed(2);
  console.log(`Total heap size (bytes) ${totalHeapSize} (GB ~${inGB})`);
  console.log('Server running at:', server.info.uri);
  serve = server;
}).catch(error => {
  console.log(error);
});

process.on('uncaughtException', async (err) => {
  console.log('uncaught exception', err);

  process.exit(1);
})

process.on('unhandledRejection', async (err) => {
  console.log('unhandled rejection', err);

  process.exit(1);
})