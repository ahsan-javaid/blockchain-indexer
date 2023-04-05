import { cpus } from 'os';
import { ConfigType } from './types/Config';

const Config = function(): ConfigType {
  const config: ConfigType = {
    maxPoolSize: 50,
    port: 3000,
    dbUrl: process.env.DB_URL || '',
    dbHost: process.env.DB_HOST || '127.0.0.1',
    dbName: process.env.DB_NAME || 'test',
    dbPort: process.env.DB_PORT || '27017',
    dbUser: process.env.DB_USER || '',
    dbPass: process.env.DB_PASS || '',
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
