import express from 'express';
import { Request, Response } from 'express';
import { Transaction } from '../../models/Transaction';
import { State } from '../../models/State';
import { Op } from 'sequelize';
// child router, merge it with parent via mergeParams
const router = express.Router({ mergeParams: true });

router.get('/:address/txs', async (req: Request, res: Response) => {
  const { address, chain, network } = req.params;
  
  const state = await State.findOne({
    where: {
      chain: chain,
      network: network,
    }
  });

  const msg = state.initialSyncComplete ? 'success' : 'Syncing in progress. wait...';

  const tx = await Transaction.findAll({
    where: {
      chain: chain,
      network: network,
      [Op.or]: [{ from: address }, { to: address }],  
  }})

  res.json({
    msg: msg,
    data: tx
  });

});

router.get('/:address/coins', (_req: Request, res: Response) => {
  /*
   * To get coin info .. indexer should store more detials like tx receipt or logs 
   * Someting like const symbol = await contract.methods.symbol().call();
   * Above will give token symbol
   */
  res.json({ msg: 'Implementation required!'})
});

router.get('/:address/balance', (_req: Request, res: Response) => {
  /*
   * Use ethers getBalance call to get balance of an address
   */
  res.json({ msg: 'Implementation required!'})
});

module.exports = {
  router,
  path: '/address'
};
