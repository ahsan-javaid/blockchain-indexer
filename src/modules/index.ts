import Logger from '../logger';
import { Class } from '../types/Class';
import { Api } from '../services/api';
import { Config } from '../services/config';
import { P2P } from '../services/p2p';

export interface IService {
  start(): Promise<void>;
  stop(): Promise<void>;
}

export class BaseModule implements IService {
  internalServices = new Array<IService>();
  constructor(
    protected indexerServices: {
      P2P: typeof P2P;
      Api: typeof Api;
      Config: typeof Config;
    } = { P2P, Api, Config }
  ) {}

  async start() {
    for (const service of this.internalServices) {
      await service.start();
    }
  }

  async stop() {
    for (const service of this.internalServices.reverse()) {
      await service.stop();
    }
  }
}

class ModuleManager extends BaseModule {
  internalServices = new Array<IService>();
  KNOWN_MODULE_PATHS = {
    ETH: './eth',
  };

  loadConfigured() {
    let { modules, chains } = Config.get();
    modules = modules || [];

    const registerModuleClass = modulePath => {
      const moduleClass = require(modulePath).default || (require(modulePath) as Class<BaseModule>);
      this.internalServices.push(new moduleClass(this.indexerServices));

    };

    // Register configured modules
    if (modules.length > 0) {
      for (const modulePath of modules) {
        registerModuleClass(modulePath);
      }
    }

    // Validate and reject unknown module
    for (const chain in chains) {
      const modulePath = this.KNOWN_MODULE_PATHS[chain];
      if (!modulePath) {
        Logger.warn(`Module not found for chain: ${chain}`);
        continue;
      }
    }
  }
}

export const Modules = new ModuleManager();
