import express from 'express';
import { Request, Response } from 'express';
import { Transaction } from '../../models/Transaction';
import { State } from '../../models/State';

// child router, merge it with parent via mergeParams
const router = express.Router({ mergeParams: true });

router.get('/:tx', async (req: Request, res: Response) => {
  const { block, chain, network } = req.params;
  
  const state = await State.findOne({
    where: {
      chain: chain,
      network: network,
    }
  });

  const msg = state.initialSyncComplete ? 'success' : 'Syncing in progress. wait...';

  const tx = await Transaction.findOne({
    where: {
      chain: chain,
      network: network,
      id: block
  }})

  res.json({
    msg: msg,
    data: tx
  });
});

module.exports = {
  router,
  path: '/transaction'
};
