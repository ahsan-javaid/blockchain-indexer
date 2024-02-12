## Blockchain indexer & api service
A proof of concept (POC) implementation of multichain indexer for ethereum based chains and layer 2 solutions

## Description
- Scans multiple ethereum based chains and layer 2 blockchain nodes
- Provides api's to fetch tx history of address across multiple chains
- Exposes adapter to publish transaction details

## System Requirements

* Built on node version: v20.9.0
* [NodeJS LTS version](https://nodejs.org/en/download)
* [MySql](https://www.mongodb.com/try/download/community)

## SDK's Used in this project
* [Sequelize](https://sequelize.org/)

## How to setup

clone the repo and cd blockchain-indexer
```bash
npm install
```

## Enviroment setup
See enviroment variables in src/config.ts
```bash
DB_URL=mysql://john:doe@localhost:3306/indexer
DB_HOST=127.0.0.1
DB_NAME=indexer
DB_PORT=3306
DB_USER=john
DB_PASS=doe
```

## Running the project
```
npm run start 
```

Run with docker

```
docker compose up
```


## Chain config
- See src/config.ts for chain config
- Feel free to add more EVM compatible chains
- Currently src/config.ts includes ETH and GNOSIS chains

## Running on local

To start the server, run the following

```bash
npm start
```

## API Documentation
Get txs for an address:
#### URL Format
```
http://localhost:3000/api/<chainName>/<testnet|mainnet>/address/<address>/txs
```

#### Example
```
http://localhost:3000/api/ETH/testnet/address/0xb733B99F0f9b690C47004A835CA25e32992194DF/txs
```
#### Example get sync status
```
http://localhost:3000
```

#### Example get block
```
http://localhost:3000/api/GNOSIS/mainnet/block/1000
```

#### Example get tokens information of an address
```
http://localhost:3000/api/ETH/testnet/address/0xb733B99F0f9b690C47004A835CA25e32992194DF/coins
```
## Adapter for transaction analyzers
Adapter implementation is not concerete ... just sharing ideas
- It could be exposed via websockets interface
- External analyzer could register a callback to receive the tx or blocks
- OR it could be a json rpc interface served over http 

## Architecture Diagram
![Screenshot](docs/diagram.png)

## Database Design
Design should be included but see src/models folder for now

## Directory structure
```
src 
|____types
| |____Class.ts
| |____Config.ts
| |____ChainNetwork.ts
| |____Worker.ts
|____utils
| |____wait.ts
|____models
| |____State.ts
| |____Block.ts
| |____Transaction.ts
|____logger.ts
|____config.ts
|____modules
| |____eth
| | |____p2p
| | | |____p2p.ts
| | | |____sync_worker
| | | | |____syncWorker.ts
| | | | |____sync.ts
| | |____index.ts
| |____index.ts
|____server.ts  <--- Entry point
|____routes
| |____adapter
| | |____index.ts
| |____api
| | |____block.ts
| | |____transaction.ts
| | |____address.ts
| |____index.ts
|____services
| |____storage.ts
| |____api.ts
| |____p2p.ts
| |____config.ts
| |____worker.ts
```

## See NOTES.md
- See NOTES.md file for more information
- See comments in code for more understanding