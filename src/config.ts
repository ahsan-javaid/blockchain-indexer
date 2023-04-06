import { cpus } from 'os';
import { ConfigType } from './types/Config';

const Config = function(): ConfigType {
  const config: ConfigType = {
    maxPoolSize: 50,
    port: 3000,
    dbUrl: process.env.DB_URL || 'mysql://root:12345678@localhost:3306/indexer',
    dbHost: process.env.DB_HOST || '127.0.0.1',
    dbName: process.env.DB_NAME || 'indexer',
    dbPort: process.env.DB_PORT || '3306',
    dbUser: process.env.DB_USER || 'root',
    dbPass: process.env.DB_PASS || '12345678',
    numWorkers: cpus().length,
    chains: {
      ETH: {
        testnet: {
          chainSource: 'p2p',
          rpc: {
            host: 'https://eth-goerli.public.blastapi.io',
          }
        }
      }
    },
    modules: ['./eth'],
    services: {
      api: {
      },
      event: {
      },
      p2p: {},
      socket: {
      },
      storage: {}
    }
  };
  return config;
};

export default Config();
