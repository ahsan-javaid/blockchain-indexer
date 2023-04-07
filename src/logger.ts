import * as winston from 'winston';
const logLevel = process.env.LOG_LEVEL || 'info';


const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: logLevel,
    })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.prettyPrint(),
    winston.format.splat(),
    winston.format.simple(),
    winston.format.printf((info) => {
      // fallback in case the above formatters  don't work.
      if (typeof info.message === 'object') {
        info.message = JSON.stringify(info.message, null, 4);
      }
      return `${info.level} :: ${new Date().toISOString()} :: ${info.message}`;
    })
  )
});

export default logger;
