export interface IChainConfig<T extends INetworkConfig> {
  [network: string]: T;
}

interface INetworkConfig {
  height?: number; // In case if you want to sync from specific height
}

export interface IEVMNetworkConfig extends INetworkConfig {
  rpc: {
    host: string;
  };
}

export interface ConfigType {
  port: number;
  dbUrl: string;
  dbHost: string;
  dbName: string;
  dbPort: string;
  dbUser: string;
  dbPass: string;
  numWorkers: number;
  chains: {
    [currency: string]: IChainConfig<IEVMNetworkConfig>;
  };
  modules?: string[];
}
