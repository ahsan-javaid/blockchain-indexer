import cluster, { Worker as ClusterWorker } from 'cluster';
import { EventEmitter } from 'events';
import logger from '../logger';
import { WorkerType } from '../types/Worker';
import config from '../config';

export class WorkerService extends EventEmitter {
  workers = new Array<{
    worker: ClusterWorker;
    active: boolean;
    started: Promise<any>;
  }>();

  async start() {
    if (cluster.isPrimary) {
      logger.info(`Master ${process.pid} is running`);
      cluster.on('exit', (worker: WorkerType) => {
        logger.warn(`worker ${worker.process.pid} stopped`);
        process.kill(process.pid);
      });
      for (let worker = 0; worker < config.numWorkers; worker++) {
          let newWorker = cluster.fork();
          logger.info(`Starting worker number: ${worker}`);
          newWorker.on('message', (msg: any) => {
            this.emit(msg.id, msg);
          });
          let started = new Promise<void>(resolve => {
            newWorker.on('listening', () => {
              resolve();
            });
          });
          this.workers.push({ worker: newWorker, active: false, started });
      }
      const startedPromises = this.workers.map(worker => worker.started);
      return Promise.all(startedPromises);
    } else {
      logger.info(`Worker ${process.pid} started`);
      return Promise.resolve();
    }
  }

  async stop() {}
}

export let Worker = new WorkerService();
