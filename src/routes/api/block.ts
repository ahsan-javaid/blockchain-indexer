import express from 'express';
import { Request, Response } from 'express';
import { Block } from '../../models/Block';
import { State } from '../../models/State';

// child router, merge it with parent via mergeParams
const router = express.Router({ mergeParams: true });

router.get('/:block', async (req: Request, res: Response) => {
  const { block, chain, network } = req.params;
  
  const state = await State.findOne({
    where: {
      chain: chain,
      network: network,
    }
  });

  const msg = state.initialSyncComplete ? 'success' : 'Syncing in progress. wait...';

  const tx = await Block.findOne({
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
  path: '/block'
};
