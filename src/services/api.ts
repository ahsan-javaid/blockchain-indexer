import * as http from 'http';
import logger from '../logger';
import app from '../routes';
import config from '../config';

export class ApiService {
  port: number;
  timeout: number;
  httpServer: http.Server;
  app: typeof app;
  stopped = true;

  constructor({
    port = 3000,
    timeout = 600000,
  } = {}) {
    this.port = Number(process.env.HTTP_PORT) || port;
    this.timeout = timeout;
    this.app = app;
    this.httpServer = new http.Server(app);
  }

  async start() {
    if (this.stopped) {
      this.stopped = false;
      this.httpServer = new http.Server(app);
      this.httpServer.timeout = this.timeout;
      this.httpServer.listen(this.port, () => {
        logger.info(`Starting API Service on port ${this.port}`);
      });
    }
    return this.httpServer;
  }

  async stop() {
    this.stopped = true;
    return new Promise<void>(resolve => {
      this.httpServer.close(() => {
        logger.info('Stopped API Service');
        resolve();
      });
      this.httpServer.emit('close');
    });
  }
}

export const Api = new ApiService({
  port: config.port
});
