export interface IChainConfig<T extends INetworkConfig> {
  [network: string]: T;
}

interface INetworkConfig {
  chainSource?: 'p2p';
  forkHeight?: number;
}

export interface IUtxoNetworkConfig extends INetworkConfig {
  rpc: {
    host: string;
  };
}

interface IProvider {
  host: string;
  port?: number | string;
  protocol: 'http' | 'https' | 'ws' | 'wss' | 'ipc';
  options?: object;
}

export interface IXrpNetworkConfig extends INetworkConfig {
  provider: IProvider & {
    dataHost: string;
  };
  startHeight: number;
  walletOnlySync: boolean;
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
    [currency: string]: IChainConfig<IUtxoNetworkConfig | IXrpNetworkConfig>;
  };
  modules?: string[];
}
