import * as worker from 'worker_threads';
import { Config } from '../../../services/config';

export class SyncWorker { 
  protected chainConfig: any;
  private chain: string = worker.workerData.chain;
  private network: string = worker.workerData.network;

  constructor() {
    this.chainConfig = Config.get().chains[this.chain][this.network];
  }
}
