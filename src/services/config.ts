import config from '../config';
import { ChainNetwork } from '../types/ChainNetwork';
import { ConfigType } from '../types/Config';

export class ConfigService {
  _config: ConfigType;

  constructor({ _config = config } = {}) {
    this._config = _config;
  }

  public get() {
    return this._config;
  }

  public chains() {
    return Object.keys(this.get().chains);
  }

  public networksFor(chain: keyof ConfigType['chains']) {
    return Object.keys(this.get().chains[chain]);
  }

  public chainNetworks(): Array<ChainNetwork> {
    const chainNetworks = new Array<ChainNetwork>();
    
    for (let chain of this.chains()) {
      for (let network of this.networksFor(chain)) {
        chainNetworks.push({ chain, network });
      }
    }
    
    return chainNetworks;
  }

  public chainConfig({ chain, network }: ChainNetwork) {
    return this.get().chains[chain][network];
  }
}

export const Config = new ConfigService();
