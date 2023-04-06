import { BaseP2PWorker } from '../../../services/p2p';
import logger from '../../../logger';
import { MultiThreadSync } from '../indexer/sync';
import { ethers } from "ethers";
import { EventEmitter } from 'events';
import { Block } from '../../../models/Block';
import { wait } from '../../../utils/wait';

export class ETHP2pWorker extends BaseP2PWorker {
  protected chainConfig: any;
  protected multiThreadSync: MultiThreadSync;
  protected provider: ethers.providers.JsonRpcProvider;
  protected syncing: boolean;
  protected initialSyncComplete: boolean;
  public disconnecting: boolean;
  public events: EventEmitter;

  constructor({ chain, network, chainConfig, blockModel = {} }) {
    super({ chain, network, chainConfig, blockModel });
    
    // Initilize chain config
    this.chain = chain || 'ETH';
    this.network = network;
    this.chainConfig = chainConfig;
    
    // Connect to rpc provider
    this.provider = new ethers.providers.JsonRpcProvider(this.chainConfig.rpc.host);
    logger.info(`Ethers, subscription added to ${this.chain}, ${this.network}`);
   
    // set sync state variables
    this.syncing = false;
    this.initialSyncComplete = false;
    this.events = new EventEmitter();
    this.disconnecting = false;
    // initilize threads or workers for syncing in parallel
    this.multiThreadSync = new MultiThreadSync({ chain, network });
  }

  async setupListeners() {
    // Notify disconnect
    this.events.on('disconnected', async () => {
      logger.warn(`Not connected chain: ${this.chain} | Network: ${this.network}`);
    });

    this.events.on('connected', async () => {
      // Subscribe to new blocks
       this.provider.on('block', async (height) => {
        const block = this.getBlock(height)
        this.processBlock(block);
        this.events.emit('block', block);
        if (!this.syncing) {
          this.sync();
        }
      });
    });

    // sync complete
    this.multiThreadSync.once('INITIALSYNCDONE', () => {
      this.initialSyncComplete = true;
      this.events.emit('SYNCDONE');
    });
  }

  async disconnect() {
    this.disconnecting = true;
    try {
      if (this.provider) {
        // Unsubscribe all listners
        this.provider.off('block')
      }
    } catch (e) {
      console.error(e);
    }
  }

  async handleReconnects() {
    this.disconnecting = false;
    let firstConnect = true;
    let connected = false;
    let disconnected = false;
    while (!this.disconnecting && !this.stopping) {
      try {
        if (!this.provider) {
          this.provider = new ethers.providers.JsonRpcProvider(this.chainConfig.rpc.host);
        }

        try {
          const networkInfo = await this.provider.getNetwork();
          connected = true;
          logger.info(`RPC health is ok at: ${networkInfo.name}`);
        } catch (e) {
          connected = false;
        }
        
        if (!connected) {
          this.events.emit('disconnected');
        } else if (disconnected || firstConnect) {
          this.events.emit('connected');
        }
        
        if (disconnected && connected && !firstConnect) {
          logger.warn(
            `Reconnected to chain: ${this.chain} | Network: ${this.network}`
          );
        }
        
        if (connected && firstConnect) {
          firstConnect = false;
          logger.info(
            `Connected to chain: ${this.chain} | Network: ${this.network}`
          );
        }
        disconnected = !connected;
      } catch (e) {}
      await wait(5000);
    }
  }

  async connect() {
    this.handleReconnects();
    return new Promise<void>(resolve => this.events.once('connected', resolve));
  }

  public async getBlock(height: number) {
    return this.provider.getBlockWithTransactions(height);
  }

  async processBlock(block: any) {
    try {
       await Block.upsert({
        id: block.number,
        chain: this.chain,
        network: this.network,
        parentHash: block.parentHash,
        hash: block.hash,
        nonce: block.nonce,
        timestamp: new Date(block.timestamp * 1000)
      });
      logger.info(`Block processed on: ${this.chain}, ${this.network}`);
    } catch (e) {
      console.error('Failed to insert block:', e);
    }
  }

  async sync() {
    //setInterval(() => {
    console.log('loop called');
    //}, 100);
  }

  async stop() {
    this.stopping = true;
    this.multiThreadSync.stop();
    logger.info(`Stopping worker for chain ${this.chain} ${this.network}`);
    await this.disconnect();
  }

  async start() {
    // wait for provider network ready
    await this.provider.ready;
    logger.info(`Started worker for chain ${this.chain} ${this.network}`);
    // Setup listners
    this.setupListeners();
    // Establilsh connection
    await this.connect();
    // Start syncing rpc node
    this.sync();
  }
}