import { BaseModule } from '..';
import { ETHP2pWorker } from './p2p/p2p';
import { ConfigService } from '../../services/config';

export default class ETHModule extends BaseModule {
  constructor(services: BaseModule['indexerServices']) {
    super(services);
    
    const configService = new ConfigService();
    // Plug chain into p2p workers
    for (const chain of configService.chains()) {
      services.P2P.register(chain, ETHP2pWorker);
    }
  }
}
