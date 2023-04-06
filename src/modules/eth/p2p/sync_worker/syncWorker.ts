import * as worker from 'worker_threads';
import { Config } from '../../../../services/config';

export class SyncWorker { 
  protected chainConfig: any;
  private chain: string = worker.workerData.chain;
  private network: string = worker.workerData.network;

  constructor() {
    this.chainConfig = Config.get().chains[this.chain][this.network];
  }

  start() { }
  
  stop() {}

  async syncBlock(_blockNumber) {
    /* Todo
     * Sync this block and notify parent thread via worker.parentPort!.postMessage call
     */
  }

  async messageHandler(_msg) {
    /*
     * Received message to process the block
     * call sync block or use redis queue approach
     */
  }

  /*
   * Start SyncWorker 
   * Listen to redis queue for incoming blocks
   */
}
