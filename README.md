## Blockchain indexer & api service
A proof of concept (POC) implementation of multichain indexer for ethereum based chains

## Description
- Scans multiple ethereum based chains
- Provides api's to fetch tx history of address across multiple chains
- Exposes adapter to publish transaction details

## System Requirements

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
Note: Dotenv is not added so modify the default values in src/config.ts or set env varibles from terminal before running npm start command

## Running on local

To start the server, run the following

```bash
npm start
```

## Documentation
See the collection for documentation:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.getpostman.com/collections/id)


## Architecture Diagram
![Screenshot](docs/Architecure.png)

## Flow Diagram
![Screenshot](docs/Flow-Diagram.png)

## Database Design
-  This is relational database design 
- Models are defined in src/models folder
![Screenshot](docs/Database-Diagram.png)

## Wiki of one complex feature
- Read the detailed explanation of xyz feature 
- Wiki link: https://github.com/ahsan-javaid/documentation/wiki