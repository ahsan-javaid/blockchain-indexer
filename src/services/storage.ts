import { Config, ConfigService } from './config';
import { initBlockModel } from '../models/Block';
import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';

export class StorageService {
  configService: ConfigService;
  sequelize: Sequelize;

  constructor({ configService = Config } = {}) {
    this.configService = configService;
   // this.connection.setMaxListeners(30);
  }

  async start() {
    // Create DB if not exists
    const connection = await mysql.createConnection({
      host: this.configService.get().dbHost,
      port: Number(this.configService.get().dbPort),
      user: this.configService.get().dbUser,
      password: this.configService.get().dbPass
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${this.configService.get().dbName}\`;`);


    this.sequelize = new Sequelize(this.configService.get().dbUrl);
    // initilize block model
    initBlockModel(this.sequelize);
    this.sequelize.sync();
  }

  async stop() {
    // Todo: //
  }
}


export let Storage = new StorageService();
