import cors from 'cors';
import fs from 'fs';
import express from 'express';
import { Web3Adapter } from './adapter';
import { State } from '../models/State';

const app = express();

app.use(cors());

function bootstrap(path?: string) {
  const router = express.Router({
    mergeParams: true
  });
  
  const folder = path ? path + '/' : '';
  
  fs.readdirSync(__dirname + '/' + path).forEach((file: string) => {
    // Dynamically import all routes in api folder
    if (file.match(/\.js$/) !== null && file !== 'index.js') {
      const route = require('./' + folder + file);
      router.use(route.path, route.router);
    }
  });

  return router;
}

app.use('/api/:chain/:network', bootstrap('api'));
app.use('/web3/:chain/:network', Web3Adapter);

// Return status of api or indexer
app.get('/*', async (_req, res) => {
  const data = await State.findAll();
  res.json({ data });
});

export default app;
