import logger from '../logger';
import { Class } from '../types/Class';
import { Config } from './config';

export class P2pManager {
  workerClasses: { [chain: string]: Class<BaseP2PWorker> } = {};
  public workers: Array<BaseP2PWorker>;

  constructor() {
    this.workers = new Array<BaseP2PWorker>();
  }

  register(chain: string, worker: Class<BaseP2PWorker>) {
    this.workerClasses[chain] = worker;
  }

  get(chain: string) {
    return this.workerClasses[chain];
  }

  async stop() {
    logger.info('Stopping P2P Manager');
    for (const worker of this.workers) {
      await worker.stop();
    }
    this.workers = [];
  }

  async start() {
    logger.info('Chains found: ', Config.chainNetworks());
    logger.info('Starting P2P Manager', Config.chainNetworks());
    for (let chainNetwork of Config.chainNetworks()) {
      const { chain, network } = chainNetwork;
      const chainConfig = Config.chainConfig(chainNetwork);

      logger.info(`Starting ${chain} p2p worker`);

      const p2pWorker = new this.workerClasses[chain]({
        chain,
        network,
        chainConfig
      });

      this.workers.push(p2pWorker);

      try {
        p2pWorker.start();
      } catch (e) {
        logger.error('P2P Worker died with %o', e);
      }
    }
  }
}

export class BaseP2PWorker {
  protected stopping = false;
  protected chain = '';
  protected network = '';

  constructor(protected params: { chain; network; chainConfig; }) {

  }
  async start(): Promise<any> { }
  async stop(): Promise<any> { }
  async sync(): Promise<any> { }
}

export const P2P = new P2pManager();
