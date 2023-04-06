import { BaseModule } from '..';
// import { EVMVerificationPeer } from '../,,/../../providers/chain-state/evm/p2p/EVMVerificationPeer';
// import { ETHStateProvider } from './api/csp';
// import { EthRoutes } from './api/eth-routes';
import { ETHP2pWorker } from './p2p/p2p';
import { ConfigService } from '../../services/config';

export default class ETHModule extends BaseModule {
  constructor(services: BaseModule['indexerServices']) {
    super(services);
    
    const configService = new ConfigService();
    
    for (const chain of configService.chains()) {
      services.P2P.register(chain, ETHP2pWorker);
    }
    // services.CSP.registerService('ETH', new ETHStateProvider());
    // services.Api.app.use(EthRoutes);
    // services.Verification.register('ETH', EVMVerificationPeer);
  }
}
