import { BaseP2PWorker } from '../../../services/p2p';
import logger from '../../../logger';
import { MultiThreadSync } from '../indexer/sync';
//import { IEVMNetworkConfig } from '../../../../types/Config';
import { ethers } from "ethers";

export class ETHP2pWorker extends BaseP2PWorker {
  protected chainConfig: any;
  protected multiThreadSync: MultiThreadSync;
  protected provider: ethers.providers.JsonRpcProvider;

  constructor({ chain, network, chainConfig, blockModel = {} }) {
    super({ chain, network, chainConfig, blockModel });
    this.chain = chain || 'ETH';
    this.network = network;
    this.chainConfig = chainConfig;
    console.log("yes its called", this.chainConfig);
    this.provider = new ethers.providers.JsonRpcProvider(this.chainConfig.rpc.host);
    logger.info(`Ethers, subscription added to ${this.chain}, ${this.network}`);

    this.provider.on('block', (n) => {
      console.log('got new block', n);
    })
    // this.syncing = false;
    // this.initialSyncComplete = false;
    // this.blockModel = blockModel;
    // this.txModel = txModel;
    // this.provider = new BaseEVMStateProvider(this.chain);
    // this.events = new EventEmitter();
    // this.invCache = {};
    // this.invCacheLimits = {
    //   TX: 100000
    // };
    // this.disconnecting = false;
    this.multiThreadSync = new MultiThreadSync({ chain, network });
  }

  async sync() {
    //setInterval(() => {
      console.log('loop called');
    //}, 100);
  }

  async start() {
    console.log('yaar its started now');
    logger.info(`Started worker for chain ${this.chain} ${this.network}`);
    // this.setupListeners();
    // await this.connect();
    this.sync();
  }
}
