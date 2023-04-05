import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());


// app.use('/api/:chain/:network', bootstrap('api'));

export default app;
