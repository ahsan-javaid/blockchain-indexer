import cluster from 'cluster';
import { Modules } from './modules';
import { Worker } from './services/worker';
import { P2P } from './services/p2p';
import { Api } from './services/api';
import { Storage } from './services/storage';

const services: Array<any> = [];

const startCluster = async () => {
  process.on('unhandledRejection', (error: any) => {
    console.error('Unhandled Rejection at:', error.stack || error);
    stop();
  });
  process.on('SIGTERM', stop);
  process.on('SIGINT', stop);
 
  if (cluster.isPrimary) {
    services.push(Storage);
    services.push(P2P);
    services.push(Worker);
  } else {
    services.push(Api); // Run api on workers ... just for little scalability
  }

  // Load chain modules
  Modules.loadConfigured();

  for (const service of services) {
    await service.start();
  }
};

const stop = async () => {
  console.log(`Shutting down: ${process.pid}`);
  for (const service of services.reverse()) {
    await service.stop();
  }
  process.exit();
};

// Start all processes, api, workers, p2p, websockets, sync
startCluster();

