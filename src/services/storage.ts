import { Config, ConfigService } from './config';
import { initBlockModel } from '../models/Block';
import { initStateModel } from '../models/State';
import { initTxModel } from '../models/Transaction';
import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';
import logger from '../logger';

export class StorageService {
  configService: ConfigService;
  sequelize: Sequelize;

  constructor({ configService = Config } = {}) {
    this.configService = configService;
  }

  async start() {
    try {
      // Create DB if not exists
      const connection = await mysql.createConnection({
        host: this.configService.get().dbHost,
        port: Number(this.configService.get().dbPort),
        user: this.configService.get().dbUser,
        password: this.configService.get().dbPass
      });

      // Create DB if not exists
      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${this.configService.get().dbName}\`;`);

      // initilize sequelize
      this.sequelize = new Sequelize(this.configService.get().dbUrl, {
        logging: false
      });

      // initilize models
      initBlockModel(this.sequelize);
      initStateModel(this.sequelize);
      initTxModel(this.sequelize);
      console.log('sync done');
      // Create DB Schema
      this.sequelize.sync();
    } catch (e) {
      console.log('yes here: ',e);
      logger.error(e);
    }
  }

  async stop() {
    // Todo: //
  }
}


export let Storage = new StorageService();
