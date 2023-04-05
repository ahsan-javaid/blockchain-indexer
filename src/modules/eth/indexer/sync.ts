import { EventEmitter } from 'events';
import Config from '../../../config';

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
}