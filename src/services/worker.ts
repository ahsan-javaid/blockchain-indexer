import cluster, { Worker as ClusterWorker } from 'cluster';
import { EventEmitter } from 'events';
import logger from '../logger';
import { CallbackType } from '../types/Callback';
import { WorkerType } from '../types/Worker';
import config from '../config';

export class WorkerService extends EventEmitter {
  workers = new Array<{
    worker: ClusterWorker;
    active: boolean;
    started: Promise<any>;
  }>();

  async start() {
    console.log('in worker start:');
    if (cluster.isPrimary) {
      console.log('master');
      logger.info(`Master ${process.pid} is running`);
      cluster.on('exit', (worker: WorkerType) => {
        logger.warn(`worker ${worker.process.pid} stopped`);
        process.kill(process.pid);
      });
      for (let worker = 0; worker < config.numWorkers; worker++) {
          let newWorker = cluster.fork();
          logger.info(`Starting worker number ${worker}`);
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
      console.log('child');
      logger.info(`Worker ${process.pid} started`);
      return Promise.resolve();
    }
  }

  async stop() {}

  sendTask(task: any, argument: any, done: CallbackType) {
    var worker = this.workers.shift();
    if (worker) {
      this.workers.push(worker);
      var id = (Date.now() * Math.random()).toString();
      this.once(id, function(result: { error: any }) {
        done(result.error);
      });
      worker.worker.send({ task, argument, id });
    }
  }

  workerCount() {
    return this.workers.length;
  }
}

export let Worker = new WorkerService();
