import { BaseModule } from '..';
// import { EVMVerificationPeer } from '../,,/../../providers/chain-state/evm/p2p/EVMVerificationPeer';
// import { ETHStateProvider } from './api/csp';
// import { EthRoutes } from './api/eth-routes';
import { ETHP2pWorker } from './p2p/p2p';

export default class ETHModule extends BaseModule {
  constructor(services: BaseModule['indexerServices']) {
    super(services);
    services.P2P.register('ETH', ETHP2pWorker);
    // services.CSP.registerService('ETH', new ETHStateProvider());
    // services.Api.app.use(EthRoutes);
    // services.Verification.register('ETH', EVMVerificationPeer);
  }
}
