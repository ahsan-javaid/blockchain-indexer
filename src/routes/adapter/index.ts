import { Request, Response } from 'express';
import logger from '../../logger';
import { Config } from '../../services/config';

export async function Web3Adapter(req: Request, res: Response) {

  const { chain, network } = req.params;
  const chainConfig = Config.chainConfig({ chain, network });
  logger.info(chainConfig);
  // Todo: Validate body to be a valid json-rpc call
  /*
   * Assuming transaction analyzer will send json rpc call
   * Get Transaction from DB or from ethers.js or json rpc interface ... 
   * Analyze transaction receipt 
   */

  /* Todo: Analyze Transaction:
   * To get token info .. indexer should store more detials like tx receipt or logs 
   * Someting like const symbol = await contract.methods.symbol().call();
   * Above will give token symbol
   */
  res.json({
    data: 'Implementation required!'
  });
}