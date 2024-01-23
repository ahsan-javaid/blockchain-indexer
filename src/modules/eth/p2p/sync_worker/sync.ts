import { EventEmitter } from 'events';
import Config from '../../../../config';

export class MultiThreadSync extends EventEmitter {
  protected chain: string;
  protected network: string;
  protected config: any; 

  constructor({ chain, network }) {
    super();
    this.chain = chain || 'ETH';
    this.network = network || 'mainnet';
    this.config = Config.chains[chain][network];
  }

  start() {}
  
  stop() {}

  async sync() {

    /* Todo: Parallel processing of blocks for faster sync
     * Start worker threads of syncWorker.ts file to process the block
     * Push a block number to redis queue
     * Worker threads will consume the redis queue in a loop
     * Receive done event once block is processed by worker thread
     */
  }
} 