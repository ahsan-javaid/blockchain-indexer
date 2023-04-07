### Approach used to sync blockchain
- State of each chain is maintained in state table

#### Subscribe to new blocks / tx
When process starts 
- Subscription added to listen new blocks
- Sync starts from 0 if not already synced

#### Sync Algorithm
```
Loop
- start from block 0....latest block
- Get the block via rpc call
- save block and tx in db
- Update state with sync block height (handled scenario if process crashed or stopped because state is maintained)
- Stop if no more blocks found
- Initial sync complete 
```

### Fill Gaps
```
- Check state from db and latest block
- Difference found
Loop
- start from block x in state....latest block
- Get the block via rpc call
- save block and tx in db
- Update state with sync block height (handled scenario if process crashed or stopped because state is maintained)
- Stop if no more blocks found
- Keep checking gaps again ... go to loop 
```

### A better approch 
- Make sync process parallel by dividing blocks in to chunks
- Use redis queue 
- Producer will push blocks into queue
- Workers as consumers will consume sycn blocks in parallel
- See approach here: src/modules/eth/p2p/sync_worker folder